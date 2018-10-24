---
layout: post
cover:  assets/visualizing-earthquake-data/cover.jpg
title: Visualizing Himalayan earthquake data spatially
date: 2018-08-31 22:31:44
type: Data Visualization
---


The idea was to visualize and estimate the accurate spatial extent, form, and intensity of earthquakes around the Himalayan region. All data including GIS shapefiles are from USGS.

## The Process
It wasn't really straightforward to get to this result or this data, so I'll be detailing the steps I took, in case someone else wants to use this dataset for better visualizing their story.

![Screenshot of the project]({{site.baseurl}}assets/visualizing-earthquake-data/one.jpg){:.wide}

### Procuring the data
The data was spread across multiple file sources on USGS. The shapefiles were separately available for each earthquake - pure shape data without magnitude. The first challenge was combining the shape data and the proper magnitude for each earthquake before aggregating them to one big file with shape geometry as polygons and magnitude values as properties.

From the [Earthquake Catalog Search](https://earthquake.usgs.gov/earthquakes/search/), the required earthquakes were identified and filtered out. This produced a JSON file with date, id, magnitude, and a few other properties for each earthquake.

From here, there was no easy way to query the shapefiles, but what could be done was to request more information. The `detail` key-value pair in the above JSON provides a URL from which we can request a more detailed version of the earthquake information.

{% highlight python %}
import urllib, json
detailed_data = json.loads(urllib.urlopen(data["features"][0]["properties"]["detail"]))
{% endhighlight %}

This gives us another longer JSON - one per earthquake, with a large amount of data - which includes links to request all linked files. 

{% highlight python %}
url2 = detailed_data["properties"]["products"]["shakemap"][0]["contents"]["download/cont_pgv.json"]["url"]
{% endhighlight %}

Requesting a response from that URL gives us the required shapefiles. 

Now comes another problem - the shapefiles are not in the FeatureCollection polygons format that Mapbox works with - which means we have to parse through the geometry that is already there and generate our own GeoJSON file that includes geometries from the multiple shapefiles, and magnitude from the details JSON. 

The shapefiles come with a value property for each polygon. However, that property is very inconsistent among datasets from different years. Some earthquakes have values on a scale of 0.2 to 0.8, while some others of the same magnitude have values over a hundred. However, they were only accurate relative to other polygons in the same earthquake data. 

In order to normalize this, the magnitude can be taken as a factor and using the maximum value in each scale, we can obtain fairly accurate normalized data. I'm gonna store this as the height property for each polygon.

{% highlight python %}
polygon_num["properties"]["height"] = float(datai["properties"]["mag"])*float(polygon_num["properties"]["value"])/max
{% endhighlight %}

Running the code against the USGS server made me realize that some earthquakes have incomplete shapefiles. These cases are rare, but they exist, and we don't want that stopping our code from querying all the data. We just need to drop in a `try-except` block to catch the errors to fix that.

{% highlight python %}
try:
    url2 = datai["properties"]["products"]["shakemap"][0]["contents"]["download/cont_pgv.json"]["url"]
except:
    print "No Shapefile for this"
    continue
response = urllib.urlopen(url2)
datai2 = json.loads(response.read())
{% endhighlight %}

And, that's it. We should be good to go!

![screen shot of terminal]({{site.baseurl}}assets/visualizing-earthquake-data/c2.jpg)

Just testing it against a random data set. - and, it works. The generated GeoJSON file is over 5MB, for just 20 earthquakes. This means that I won't be able to upload the GeoJSON to Mapbox without using their APIs. The alternative here is to generate our own tilesets offline and then upload the generated vector tilesets to Mapbox. The upload limit is much higher for tilesets, and we should be able to upload large files without any issues. 

I'm using the Mapbox recommended command line tool[ tippecanoe](https://github.com/mapbox/tippecanoe) to generate tilesets from my GeoJSON.

![screen shot 2018-08-31 at 11 19 31 am]({{site.baseurl}}assets/visualizing-earthquake-data/c1.jpg)

This takes a while depending on how big your data is, and how fast your computer is. It took around 7 minutes for the data that I was working on. Once it's done, you're left with a *.MBTILES file which can then be uploaded to Mapbox.

Mapbox then takes some time to process it (forever!). 

### Visualizing the procured data
The data is essentially different groups of stacked polygons, and as such can be extruded in Mapbox. I've used the height value that we calculated earlier to set the heights, as well as a color scale as it's a function of the relative scale and the magnitude, and therefore is ultimately a function of that earthquake's magnitude.

![screenshot of visualization]({{site.baseurl}}assets/visualizing-earthquake-data/two.jpg){:.wide}

You can also see how the form produced by an earthquake in land differs greatly from one at sea which tend to mostly be uniform and circular.

![screen shot 2018-08-31 at 11 31 48 am]({{site.baseurl}}assets/visualizing-earthquake-data/three.jpg){:.wide}



[Link to the Visualization](https://api.mapbox.com/styles/v1/naveenshaji/cjlhgisdj0mmo2snyl35psp18.html?fresh=true&title=true&access_token=pk.eyJ1IjoibmF2ZWVuc2hhamkiLCJhIjoiY2pkaDhxdTczMHVnZDMzcGc0NjRxZzlvNyJ9.1lcZibVu2cYiOITaiEjfsA#7.15/28.917/86.529/0/60)

## Use the source, Luke!
The entire code is on the repository [here](https://github.com/naveenshaji/earthquake-data/tree/master). I have not included any of the data files in order to keep the repo clean, and because they are trivial to generate with the script. 

This is the final Python script that was used to query the data.

{% highlight python %}
import urllib, json
json_ex = {
    "type": "FeatureCollection",
    "features":[]
}
with open('data/index3.geojson') as f:
    data = json.load(f)
count = 0
for quake_num in data["features"]:
    count=count+1
    url = quake_num["properties"]["detail"]
    response = urllib.urlopen(url)
    datai = json.loads(response.read())
    print "Got details for : ", quake_num["properties"]["title"]
    try:
        url2 = datai["properties"]["products"]["shakemap"][0]["contents"]["download/cont_pgv.json"]["url"]
    except:
        print "No Shapefile for this"
        continue
    response = urllib.urlopen(url2)
    datai2 = json.loads(response.read())
    max=0
    for polygon_num in datai2["features"]:
        if float(polygon_num["properties"]["value"])>max:
            max=float(polygon_num["properties"]["value"])
    for polygon_num in datai2["features"]:
        polygon_num["geometry"]["type"] = "Polygon"
        polygon_num["properties"]["height"] = float(datai["properties"]["mag"])*float(polygon_num["properties"]["value"])/max
        json_ex["features"].extend(datai2["features"]);
    print "Appended - ",count
print "Writing to file"
with open('json_ex.json', 'w') as outfile:
    json.dump(json_ex, outfile)
{% endhighlight %}

## The way forward

- I would love to have visualized a lot more earthquakes this way to be able to estimate better, however considering the time Mapbox takes to process MBTILES or even GeoJSON, I don't think it's happening.

- An interactive visualization where a Mapbox flythrough of some of the more interesting earthquakes 3d forms and an explanation for them being that way.

## Feedback

If anyone has issues with the code or has figured out how to process larger datasets, open an issue [here](https://github.com/naveenshaji/earthquake-data/issues), submit a pull request, or leave a comment below.