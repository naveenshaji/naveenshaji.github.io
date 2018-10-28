---
layout: post
cover:  assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/ia.jpg
title: 72 Hour Design Challenge - Designing a Corporate Expense Tracker
date: 2018-10-26 10:00:44
type: Interaction Design
---

Businesses conventionally reimburse their employees for expenses incurred during the carrying out of business needs. However, the process for the same has remained largely unchanged. Stash bills in the dash, pull them all out at the end of the month, fill up a form detailing the use of funds, and pin it all up and submit it at the office.

It's time we looked critically at what's at play here, and evaluate how much this affects the productivity of employees.

## The Design Process

This was a project done by one person in 72 hours (_including writing this report_), and as such, I followed a very lean and fast-paced design process, while retaining focus on the user.

### Secondary Research

There are multiple ways by which companies handle expense filing and reimbursement for their employees.

- __Paper based forms__:
These still seem to be the most common method of filing for reimbursements, with __over 41% of business travelers __ using paper form based filing. This system works by asking the employee to fill a form with detailed information about each expense and attaching original receipts before passing it all onto the Finance Department.

- __Online filing through Web Portal__: There are some systems which try a different approach, by digitizing the entire paper form affair. However, the process is more or less the same, where each employee has to fill out a long web form, adding each and every single expense separately, before uploading scanned copies of the original receipts.

- __App based system__: These have become fairly common these days with the ability of smartphones to easily scan receipts, and even use ORC (Optical Character Recognition) to effortlessly identify, and automatically fill up required details. These make it pretty easy for employees, as they only have to scan each receipt once, and provide some background information, while the app takes care of the rest. 

### A critique of current solutions

While going through the above few paragraphs, it may have occurred to you that an App based system entirely solves the various issues faced by employees who file expenses manually at the office and go through the paperwork. Well, the digital system comes with its own set of caveats.

The only real appeal of the digital system is that you don't have to type out each and every expense that needs to be reimbursed, and somehow, the system will read all kinds of receipts and correctly tag particulars and amounts. 

However, in the real world, this rarely works. Receipts come in all sizes and languages, and more often than not, the employee has to correct or manually enter particulars when the OCR fails.

Considering this, it's no surprise that 41% of users still prefer filing reports manually.

### Corporate Fraud

Expense reporting fraud costs U.S. businesses alone more than __$2.8 billion per year.__ Employees engage in a wide variety of activities to cheat the system—most of which are considered fraud schemes. The Association of Certified Fraud Examiners (ACFE) breaks down expense reporting schemes into four categories:

- __Multiple reimbursement schemes__ – When an employee requests to be reimbursed multiple times (likely from different individuals) for the same expense. This is most common when the employee has multiple forms of documentation that serve as proof of purchase.

- __Fictitious expense schemes__ – When an employee completely makes up a purchase and requests to be reimbursed for that expense.

- __Overstated expense schemes__ – When an employee inflates the actual cost of a business expense prior to requesting reimbursement.

- __Mischaracterized expense schemes__ – When an employee attempts to receive reimbursement for a personal expense by characterizing it as a business expense.

### Travel Reimbursement

Companies reimburse employees who use their own vehicle for business use through a standard fare-rate. It's usually not easy to estimate the exact distance traveled in cases like this.

## Establishing Personas

I believe in establishing Personas early on in the design process to that each and every step forward can be validated from the User's perspective.

>You only design for one persona. If your product addresses multiple personas, it’s a multi-headed hydra. Better be sure you know what you are doing, and why. - __Alan Cooper__ (Author of About Face: Essentials of Interaction Design)

Personas represent what Users want, and according to Alan Cooper (_and me_), you'll design a better product if you design for one and only one persona.

### User Persona: __Adarsh Chako__

Adarsh is tired of collecting receipts every day and keeping them safe. More than that, he's tired of filling the reimbursement form and submitting it at the Finance Dept. When he heard about the new system for filing expenses, he is excited to try it out.

Adarsh is a man who is focused on productivity. He'd rather not do things that he thinks is a waste of his time. He's super passionate about his work, and loves spending long hours in the office in his corner, doing the work he loves.

He has often skipped out on chances to claim reimbursements just because he didn't think it was worth going through all that effort and wasting all that time.

## Ideation and Brainstorming

Ideated multiple solutions using techniques like Brainstorming, Brain Writing, and Lateral thinking to diverge into more wild ideas, and then combined elements from different ideas to converge into a set of diverse, but feasible ideas.

![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/ideation.jpg){:.wide}

Ideation was required for multiple problems. These are some of the more interesting ideas.

### The process of acquiring the transaction data from the user.

- The app acts as a payment gateway, and all transactions get recorded.
- The user's SMS messages from the bank act as data required.
- UPI API to fetch transaction history (_no provision_).
- Online Banking API to fetch transaction history. (_Already being done by Spendee App on iOS_)
- Scanning of receipts and using OCR.

### Fraud Prevention

- Use two sources of transaction data to prevent forgery.
- Require a photo of the receipt as well as a digital transaction confirmation.
- Record GPS coordinates for cross verification of the location of spend.
- Use image recognition to compare receipt images provided by two different users to make sure they are not the same.

### Own Vehicle Travel

- Make travel reimbursement a function of fuel purchased and make/model of vehicle.
- Track the journey using the phone's GPS, and validate.

## Validation of Ideas

Each of the selected few ideas that converged from the ideation process was plotted on a difficulty - importance matrix to determine the one that was most feasible while remaining usable. This was then evaluated with the persona, which determined the best solution.

> Automatic fetching of every transaction from the users' multiple banks accounts through the NetBanking API, and automatically classifying them as Business and Personal, while employing multiple layers of fraud prevention, and automatic filing of all Business transactions that satisfy certain criteria and tracked Business rides.

## Taking it back to the User

A quick round of user interaction ensued over a few phone calls with valuable feedback received that helped define the solution even more. The feedback was integrated into the system going forward and was reflected in the Scope Document.

## Defining the Scope

The scope sets in stone what ideation has led to, and serves to keep context while moving forward on to the Information Architecture and User Flows.

### Introduction

The app helps increase the productivity of corporate employees by making it infinitely easier and non-time-consuming while adding extra protection against fraud.

The ideal outcome would be a system where filing business reimbursement requests is not a task at all. It should be something that happens automatically. That's where this solution points towards.

### System Description

The platform uses the NetBanking API to access and sync with every transaction made by the user from all his bank accounts. The transactions are analyzed and tagged with location info. By default, they are marked as a personal expense. The user has the option of one-click adding a picture of a receipt. This receipt gets scanned and matched automatically to a transaction from the bank records. This process verifies the amount as well and eliminates chances of fraud along with the geolocation.

Once a transaction has a receipt added, it gets tagged as a business transaction and is automatically submitted for reimbursement. The reimbursement status is visible, and if declined, the transaction is re-tagged as personal. The user also has an option to add more information like the purpose of expenditure to increase chances of getting refunded.

### Security

As the app will have access to the spending habits of the users, and their financial documents, and location information, privacy must be a top priority. Ideally have a TouchID or FaceID lock for the App as well.

## Information Architecture

With the scope in place, it was easy to come up with different cards denoting different data structures in the app. They were roughly categorized based on the card sorting technique by a few users.

![Information Architecture]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/ia.jpg){:.wide}

## Wireframing

After a lot of iterations, the wireframes on paper were finalized. These were very low fidelity and dealt mostly with how data was presented.

## Visual Design Patterns

Having consistent design guidelines in place is always important. I put together a quick style guide before starting out designing the surface of the app. I've used a Fibonacci series to define the font sizes, as well as, the layout spacing. This ensures a highly consistent design experience.

![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/color.jpg){:.wide}
![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/text.jpg){:.wide}

Started out by creating molecules - small elements which are made by combining two or more atoms, or single function elements. I'm following Brad Frost's atomic design system here.

One very important distinction is the difference in styling for Personal expenses and Business Expenses. These should be very clearly differentiable.

![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/dichotomy.jpg){:.wide}
![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/cover.jpg){:.wide}
![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/screens.jpg){:.wide}

## Design for Everyone - WCAG 2.0

The Web Content Accessibility Guidelines (WCAG) 2.0 covers a wide range of recommendations for making Web content more accessible. Compliance with the Guidelines makes content accessible to a wider range of people with disabilities, including blindness and low vision, deafness and hearing loss, learning disabilities, cognitive limitations, limited movement, speech disabilities, photosensitivity and combinations of these.

Accessibility was a major factor during the entire visual design phase, and most design decisions have been taken keeping accessibility in mind.

_The Visual Design of this app including all aspects of the UI and color palette conform to at least __AA__ on the WCAG 2.0 Specifications._

## User Flows

The detailed flow of how to tag an automatically added expense as a business expense. When a transaction is tagged as a business expense, it is automatically sent for verification if a receipt or additional details are present.

![photo]({{site.baseurl}}assets/72-hour-design-challenge-designing-a-corporate-expense-tracker/flow1.jpg){:.wide}

## Conclusion

It's been a very exciting three days. I've pushed myself harder than ever to deliver this on time, and I've learned quite a lot from the process.  I'd love to take this forward and actually do some user testing to further understand the feasibility of my solution.
