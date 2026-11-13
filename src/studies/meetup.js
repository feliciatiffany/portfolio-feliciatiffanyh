// Study case: Meetup. Rendered by src/pages/StudyStory.jsx.
// The order follows Fany's storyboard (FigJam, section "portfolio"): the question, overview, problem,
// the solution up front, then how she got there (research, opportunities, ideas, testing, lessons).
// Each section is { label (short, also the left section list), title, blocks: [...] }.
// Block kinds: p, h (small heading inside a section), aside, wide (one image), strip (all screens in
// one row), phones (screens side by side with a tag), quotes, cards, list, stages, wires.
const M = "/media/study/meetup";

export default {
  slug: "meetup",
  title: "Meetup, person to person",
  hook: "How can Meetup use person-to-person relationships to invite people in, and to make them want to stay on the app?",
  meta: [
    { label: "Timeline", value: "Sep – Oct 2026" },
    { label: "Scope", value: "User research, product design, prototyping, user testing" },
    { label: "Type", value: "Concept · class project, solo" },
  ],
  cover: { src: `${M}/cover.webp`, alt: "Four redesigned Meetup screens: Explore, the event page, Notifications and the after-event check-in" },

  sections: [
    {
      label: "Overview",
      title: "What this project is",
      blocks: [
        { kind: "p", text: "Meetup is an app where people find local groups and events around something they like. I looked at one workflow, which is joining an event: how you find one, how you decide to go, the days of waiting before it, and what happens after." },
        { kind: "p", text: "I didn’t redesign the whole app. Every change I made stays inside that one flow, and most of them are new features added to screens that people already know." },
        { kind: "aside", title: "My role", text: "I did this one by myself, from the research and the paper sketches to the Figma prototype, the user testing and two rounds of iteration." },
      ],
    },
    {
      label: "Problem",
      title: "It’s easy to join the first time, but hard to stay",
      blocks: [
        { kind: "p", text: "Meetup is a really good app for getting found. It shows up when you search for things to do, it has strong marketing, and it has the potential to be the place people go when they want to find a community. But that also means Meetup needs to make people stay once they’re in the app." },
        { kind: "p", text: "My hypothesis was that the app feels empty, and that makes people lazy to come back to it. After studying it, I found there is very little interaction between users inside the app. It’s unclear what you’re supposed to do after you sign up, and you can hardly feel the vibe of a group or an event before you go. All of that also makes the app feel less credible." },
      ],
    },
    {
      label: "Solution",
      title: "So the solution I’m proposing",
      blocks: [
        { kind: "p", text: "I added a few features along the way to an event. Each one puts a real person in front of you at a moment where the app used to feel empty." },
        {
          kind: "list",
          items: [
            ["Explore rows", "The same events are grouped under titles that sound like an invitation, and each card shows how many of your friends are going. This helps when you can’t feel the vibe from a list."],
            ["Activity thread", "The event page has a thread where the host posts updates in their own words and people reply. This is the user-to-user interaction that was missing."],
            ["Personal notifications", "Each notification starts with a person, like who invited you or what the host just said. It gives you something to do after you sign up."],
            ["Moments", "After the event you can say who you met and post a photo back to the event. This fills the empty pages with real activity, which makes a group more credible."],
          ],
        },
        {
          kind: "strip",
          items: [
            { src: `${M}/after-explore.webp`, alt: "Redesigned Explore with titled rows and friends going", label: "Explore rows" },
            { src: `${M}/strip-activity.webp`, alt: "The Activity thread on the event page", label: "Activity thread" },
            { src: `${M}/after-notifications.webp`, alt: "Notifications that start with a person", label: "Notifications" },
            { src: `${M}/after-post.webp`, alt: "Post your moment after the event", label: "Moments" },
          ],
        },
        { kind: "p", text: "I tested the prototype with two people. What they found interesting when joining an event was the short “what to expect”, the tags, and being able to see who is going. One of them also pointed out the way the thread shows a name, their text and the reactions. Both said that in real life they decide based on whether the event sounds interesting and whether someone they know is going, which is what these features try to show." },
      ],
    },
    {
      label: "Research",
      title: "How I found out about the problem",
      blocks: [
        { kind: "p", text: "I’m a passionate event joiner. But after going to some events through Meetup, I got bored with the app and I couldn’t find a sense of community in it. I was wondering if other people feel the same, so I started searching." },
        {
          kind: "quotes",
          items: [
            { text: "Is it really that difficult to make friends with local New Yorkers?", source: "Reddit, r/AskNYC" },
            { text: "Seeking friends who DON’T disappear after 3 business days.", source: "Reddit, r/MakeFriendsOver30" },
            { text: "How do I meet people in New York", source: "Reddit, r/eastvillage" },
            { text: "I’m not going to pay these guys any more money for a group that’s no longer active.", source: "App review, 1 star" },
          ],
        },
        { kind: "p", text: "At the same time, I traced the app’s flow and all of its happy paths, screen by screen, and found some gaps in between. The biggest one is that the flow works well as a transaction, where you find an event, RSVP and get a ticket, but after the ticket there is nothing. I started ideating from these gaps." },
        { kind: "wide", src: `${M}/flow-join.webp`, alt: "Screenshots of Meetup’s current join flow, from the event page to the ticket and email confirmation", caption: "Meetup’s current flow for joining an event. It ends at the ticket." },
        { kind: "p", text: "I also tried other apps with a similar job to be done. None of them gave me what I needed, but I came out with a list of what each one does well, and why." },
        {
          kind: "cards",
          items: [
            { title: "Beli", tag: "Tracking and ranking restaurants", text: "Your history is visible and easy to share, and seeing what your friends did makes you want to try it too." },
            { title: "Bucket", tag: "Bucket lists with friends", text: "It shows you the goals you share with your friends, and turns a finished goal into a small story you can post." },
            { title: "A side-quest app", tag: "Daily routines as quests", text: "Small challenges and streaks give you a reason to take the next step, and to come back tomorrow." },
          ],
        },
        { kind: "p", text: "So my research comes from three places: proof online, the main path in the app, and an analysis of the main reasons people use Meetup. From there I could build the user personas and their journey maps." },
        {
          kind: "cards",
          items: [
            { title: "Josh, 25", tag: "Shy newcomer", text: "He moved to New York three months ago and knows almost no one outside of work. He wants to feel invited into a group, “not like he’s cold-walking into a room of strangers.”" },
            { title: "Amy, 18", tag: "Age-matched hobbyist", text: "She shoots film and wants to meet people her own age. Right now she has to message a stranger just to ask what the crowd is like." },
            { title: "David, 35", tag: "Organizer", text: "He grew his run club from three friends to 200 members, mostly unpaid. He keeps answering the same questions across DMs, comments and spreadsheets." },
          ],
        },
        { kind: "h", text: "Where they get stuck on the way to an event" },
        {
          kind: "list",
          items: [
            ["Finding", "Amy “can’t tell skill level, cost, or typical attendee age from search results alone.”"],
            ["Deciding", "Josh “can’t tell active groups from dormant ones” and asks, “Is this group even still active?”"],
            ["Waiting", "Josh is “nervous and second-guesses the plan until the day arrives.” David’s answers are scattered “across DMs, RSVP comments, and spreadsheets.”"],
            ["After", "Josh needs “a way to turn one good event into an ongoing social circle rather than a one-off.”"],
          ],
        },
      ],
    },
    {
      label: "Opportunities",
      title: "Why people don’t stay, and three ways to improve it",
      blocks: [
        { kind: "p", text: "Understanding all of that brought me to a point where I could summarize some hypotheses on why people aren’t loyal to the app, or lose interest after trying it. The information that would encourage them is buried, the only way to ask a question is to message a stranger, and nothing connects a member and an organizer after the RSVP." },
        { kind: "p", text: "From those I wrote three opportunities for improvement, and looked at which part of the flow each one covers." },
        {
          kind: "stages",
          stages: ["Find", "Decide", "RSVP", "Wait", "Attend", "After"],
          items: [
            { title: "1 · Vibe at a glance", from: 1, to: 2 },
            { title: "2 · Know before you go", from: 2, to: 4 },
            { title: "3 · Back and forth", from: 3, to: 6, chosen: true },
          ],
          caption: "Which steps of joining an event each opportunity covers. I chose the third.",
        },
        {
          kind: "list",
          items: [
            ["Vibe at a glance", "Move the information that reassures people to the top of the event page. It already exists, but it’s buried, mostly behind the paywall, and missing from Explore."],
            ["Know before you go", "A card written by the host that answers what newcomers are too shy to ask, so David doesn’t have to answer the same thing one by one."],
            ["Back and forth", "A way for members and organizers to keep talking after the RSVP, with welcomes, updates, photos and thank-yous."],
          ],
        },
        { kind: "p", text: "I went with the third one because it covers the most of the flow, including the part after the ticket where the app has nothing today. If the organizer can respond when someone joins or posts, and the member gets a welcome or a thank-you back, then David can see his effort is working, and Josh and Amy get the social circle they came for." },
      ],
    },
    {
      label: "Ideas",
      title: "Three ideas for where that relationship could live",
      blocks: [
        { kind: "p", text: "From there I developed three potential improvements in the app. I sketched them on paper first, and I wanted them to be really different from each other and not small variations." },
        {
          kind: "wires",
          items: [
            { wire: "profile", title: "A · Profile", text: "A record of your events, badges and challenges. Good for long-term motivation, but it feels empty for a first-timer and the stats could become pressure." },
            { wire: "thread", title: "B · Event thread", text: "A group chat for each event. People already know how it works, but it gets noisy, and once it’s muted nothing reaches you." },
            { wire: "phases", title: "C · Phases", text: "A stepper that shows the right option at the right moment. It’s clear, but it feels like a to-do list and ends when the event does." },
          ],
        },
        { kind: "p", text: "After reviewing them, I didn’t think any of the three could work by itself, so I combined them. The conversation from the thread moves onto the event page, where it stays as a record like the profile. From the phases I took the idea that different things should show up before and after the event. I looked at Partiful for how warm it sounds, and at Beli for how seeing your friends’ activity makes you want to join in." },
      ],
    },
    {
      label: "Changes",
      title: "What changed in the app, step by step",
      blocks: [
        { kind: "h", text: "Choosing an event" },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-explore.webp`, alt: "Meetup’s current Explore screen: filter chips and a single list of large event cards", label: "Before" },
            { src: `${M}/after-explore.webp`, alt: "Redesigned Explore: rows titled Trending in New York, Stay Healthy and Tech and industries, with a line on each card saying how many friends are going", label: "After" },
          ],
        },
        { kind: "p", text: "Explore used to be one long list under a row of filters. I regrouped the same events into rows with titles that feel more like an invitation, like “Trending in New York”, “Stay Healthy” and “Creative souls”. I got the idea from how Netflix names its rows. In the second iteration I added how many of your friends are going to each card." },

        { kind: "h", text: "Deciding to go" },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-event.webp`, alt: "Meetup’s current event page: title, date, location, organizer rating and a long description", label: "Before" },
            { src: `${M}/after-event-top.webp`, alt: "Redesigned event page: a banner saying you and 13 guests are going, a short What to Expect, tags, and who is hosting and going", label: "After" },
            { src: `${M}/after-event-activity.webp`, alt: "The Activity thread on the event page: a text blast from the host, people’s replies such as attending and 50/50, and a box to say something", label: "After · Activity" },
          ],
        },
        { kind: "p", text: "The event page tells you what and when, but not really who you’ll meet. I moved “what to expect”, the tags and who is going above the long description, and hid the sections that stay empty until the event is done. Then I added the Activity thread. The host’s update shows up there in their own words, like what time it starts and “find me in blue t-shirt and a cap”, and people can respond with one tap that they’re attending, interested, or 50/50." },
        { kind: "p", text: "The downside is the page got longer. That’s why I was careful with the order, so the things you need to decide come first and the conversation comes after." },

        { kind: "h", text: "Waiting for the day" },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-notifications.webp`, alt: "Meetup’s current notifications: a list of system announcements about new groups and last chances", label: "Before" },
            { src: `${M}/after-notifications.webp`, alt: "Redesigned notifications: Fany invited you to an event, Jorge invited you to join Lucky Cat Mahjong, Karen sent a text blast with her message quoted, and three people you met are going to Flower Making Class", label: "After" },
          ],
        },
        { kind: "p", text: "The notifications Meetup sends before an event are mostly announcements, like a new group just started or last chance to get your spot. I rewrote them so each one starts with a person and not with the event. So it says “Jorge invited you to join Lucky Cat Mahjong”, or “Karen sent a text blast” with her message right under it." },

        { kind: "h", text: "After the event" },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-review.webp`, alt: "Meetup’s current prompt after an event: How did you find it, with five stars", label: "Before" },
            { src: `${M}/after-feel.webp`, alt: "Redesigned check-in: the same rating, followed by Who did you meet with attendees to tap", label: "After · Check-in" },
            { src: `${M}/after-post.webp`, alt: "Post your moment: add a photo and a caption", label: "After · Moment" },
            { src: `${M}/after-moments.webp`, alt: "The event’s Activity thread after the event, with photos posted by Karen and by the host", label: "After · On the event" },
          ],
        },
        { kind: "p", text: "Meetup already asks “How did you find it?” with five stars. I kept the rating and added two more steps to the same sheet: “Who did you meet?” and “Post your moment”. The moments go into the event’s Activity thread, so the empty Photos section finally has real pictures and the next newcomer can see what the event actually looks like. The people you tapped are also how the app can tell you later that “3 people you met are going” to another event." },
      ],
    },
    {
      label: "Testing",
      title: "I conducted user testing",
      blocks: [
        { kind: "p", text: "Before testing I wrote down six hypotheses and how I’d know if each one was true. For example, I believed that personal wording would feel more inviting than event wording, and that members could find an organizer’s update and act on it without help. I gave each tester the same situation: you moved to New York a few months ago, it’s Thursday evening, and your weekend is free." },
        {
          kind: "list",
          items: [
            ["What worked", "What to expect, the tags and the Explore rows. One of them said the name, text and reaction format in Activity was interesting."],
            ["What confused them", "Whether “Going” shows friends or strangers, and whether anyone can send a text blast or only organizers."],
            ["What was too much", "The review block repeated the title, and one tester felt notifications and activity overlap."],
            ["What they wanted", "A text box in Activity, timestamps, and a way to tell friends from strangers."],
          ],
        },
        { kind: "p", text: "For the second iteration I focused on what they wanted. Activity is now a thread with a “Say something” box, posts show when they were made, and Explore and notifications point out your friends and the people you’ve met." },
      ],
    },
    {
      label: "Learned",
      title: "What I learned",
      blocks: [
        { kind: "p", text: "The changes that worked best were the ones I added to screens people already know. When I made something new that overlapped with what was already there, the testers noticed it right away. Next time I want to focus on new features inside the flow people already understand, instead of changing how they think about the app." },
        { kind: "p", text: "I was also surprised by how much of the warmth came from the wording and not the layout. “Jorge invited you” is almost the same notification as before, it just starts with a person." },
        { kind: "p", text: "And I only designed the member’s side. David is a third of my research, so the next thing I’d work on is his view: approving moments, thanking people, and seeing who came back." },
      ],
    },
  ],
};
