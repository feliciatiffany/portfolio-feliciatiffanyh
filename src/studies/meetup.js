// Study case: Meetup, the join-an-event flow. Rendered by src/pages/StudyStory.jsx.
// Each section is { label (short, also the left section list), title (the question or statement),
// blocks: [...] }. Block kinds: p, aside, wide (one image), phones (screens side by side, each with a
// tag such as Before / After), sketches, cards, list.
const M = "/media/study/meetup";

export default {
  slug: "meetup",
  title: "Joining an event on Meetup",
  hook: "How can joining an event feel more like being invited by someone, and less like buying a ticket?",
  meta: [
    { label: "Timeline", value: "Sep – Oct 2026" },
    { label: "Scope", value: "User research, product design, prototyping, user testing" },
    { label: "Type", value: "Concept · class project, solo" },
  ],
  cover: { src: `${M}/cover.webp`, alt: "Four redesigned Meetup screens: Explore, the event page, Notifications and the after-event check-in" },

  sections: [
    {
      label: "Overview",
      title: "I followed one flow, from finding an event to wanting to come back",
      blocks: [
        { kind: "p", text: "Meetup is where people find local groups and events around something they like. For this project I picked the part that most people open the app for, which is joining an event. I looked at how you find one, how you decide to go, the days of waiting before it, and what happens after." },
        { kind: "p", text: "I didn’t want to redesign the whole app for this. Every change here stays inside that one flow, because I wanted to understand where joining stops feeling good and what is missing at that exact moment." },
        { kind: "aside", title: "My role", text: "I did this one by myself. I went through the current app screen by screen, wrote three personas and their journey maps, sketched three directions on paper, built the prototype in Figma, then tested it and iterated on it twice." },
      ],
    },
    {
      label: "Result",
      title: "What I ended up adding to the flow",
      blocks: [
        { kind: "p", text: "The steps to join are still the ones Meetup has today. What I added is a way for members and the organizer to actually hear from each other at every step." },
        {
          kind: "list",
          items: [
            ["Choosing", "Explore is grouped under titles that sound like an invitation, and each event shows how many of your friends are going."],
            ["Deciding", "The event page shows what to expect and who is coming before the long description, and it has an Activity thread."],
            ["Waiting", "Notifications tell you who invited you and what the host just said, in their own words."],
            ["After", "A short check-in asks how it went and who you met, and you can post a photo back to the event."],
          ],
        },
        { kind: "wide", src: `${M}/cover.webp`, alt: "The four redesigned screens side by side", caption: "Explore, the event page, Notifications, and the check-in after the event." },
        { kind: "p", text: "I tested it with two people. They both got through the flow, and they both liked the same parts: what to expect, the tags, and being able to see who is going. They also told me where it was too much, and that is what I worked on in the second iteration." },
      ],
    },
    {
      label: "Problem",
      title: "The happy path ends at the ticket",
      blocks: [
        { kind: "p", text: "I started by screenshotting every screen of the current app and laying out the join flow in order. It works well as a transaction: you find an event, you RSVP, you get a ticket. But after the ticket there is nothing. You don’t have a record of where you’ve been, you don’t have a reason to go again, and you can’t find the people you met." },
        { kind: "wide", src: `${M}/flow-join.webp`, alt: "Screenshots of Meetup’s current join flow, from the event page to the ticket and email confirmation", caption: "Meetup’s current flow for joining an event." },
        { kind: "p", text: "Then I read reviews and Reddit threads to write three personas, and I mapped each of them through that same flow to see where they struggle." },
        {
          kind: "cards",
          items: [
            { title: "Josh, 25", tag: "Shy newcomer", text: "He moved to New York three months ago and knows almost no one outside of work. He wants to feel invited into a group, “not like he’s cold-walking into a room of strangers.”" },
            { title: "Amy, 18", tag: "Age-matched hobbyist", text: "She shoots film and wants to meet people her own age. Right now she has to message a stranger just to ask what the crowd is like." },
            { title: "David, 35", tag: "Organizer", text: "He grew his run club from three friends to 200 members, mostly unpaid. He keeps answering the same questions across DMs, comments and spreadsheets." },
          ],
        },
        { kind: "wide", src: `${M}/journey-josh.webp`, alt: "Journey map for Josh across awareness, consideration, acquisition, service and loyalty, with his feelings at each step", caption: "Josh’s journey map. His lowest moments are right before the event and right after it." },
        { kind: "p", text: "What I noticed is that all three get stuck in the same two places. Before the event, Josh is asking himself “Is this group even still active?” After the event, he is looking for David and David is looking for newcomers, but nothing in the app connects them. So Meetup is enough to get people to join the first time, but it’s hard to make them stay." },
      ],
    },
    {
      label: "Opportunity",
      title: "What if members and organizers could keep talking after the RSVP?",
      blocks: [
        { kind: "p", text: "From the journey maps I wrote up three opportunities. For each one I listed the evidence, who it affects, the constraints I was assuming, and what I would do about it." },
        {
          kind: "cards",
          items: [
            { title: "Vibe at a glance", tag: "Opportunity 1", text: "Move the information that reassures people to the top of the event page. It already exists, but it’s buried, mostly behind the paywall, and missing from Explore." },
            { title: "Know before you go", tag: "Opportunity 2", text: "A card written by the host that answers what newcomers are too shy to ask, so David doesn’t have to answer the same thing one by one." },
            { title: "Back and forth", tag: "Opportunity 3 · the one I chose", text: "A way for members and organizers to keep talking after the RSVP, with welcomes, updates, photos and thank-yous." },
          ],
        },
        { kind: "p", text: "I went with the third one. At first I thought the problem was that members don’t have enough motivation, but the more I looked at it, the more it seemed like the relationship between a member and an organizer has nowhere to happen once the ticket is issued. If the organizer can respond when someone joins or posts, and the member gets a welcome or a thank-you back, then David can see his effort is working, and Josh and Amy get the social circle they came for." },
        { kind: "p", text: "I also kept a part of the first opportunity, because it’s mostly moving information that Meetup already has to the place where people make their decision." },
      ],
    },
    {
      label: "Exploration",
      title: "I sketched three directions on paper",
      blocks: [
        { kind: "p", text: "I wanted the three to be really different from each other and not small variations, so each one puts the relationship in a different place." },
        {
          kind: "cards",
          items: [
            { title: "A · Profile", tag: "A record of what you’ve done", text: "A profile with your events, badges and challenges. It gives long-term motivation, but there is a lot to navigate, it feels empty for a first-timer, and the stats could become pressure." },
            { title: "B · Event thread", tag: "A conversation", text: "A group chat for each event, like WhatsApp or Partiful. People already know how it works, but it can get noisy, and once someone mutes it nothing reaches them at all." },
            { title: "C · Phases", tag: "A guide", text: "A stepper that shows the right option at the right moment, from RSVP to thank-you. It’s clear, but it feels like a to-do list, and I doubt people would open it after the event." },
          ],
        },
        {
          kind: "sketches",
          items: [
            { src: `${M}/sketch-a.webp`, alt: "Paper wireframes for Direction A, a profile with badges, activity and challenges", label: "A · Profile" },
            { src: `${M}/sketch-b.webp`, alt: "Paper wireframes for Direction B, an event thread with notifications and host replies", label: "B · Event thread" },
            { src: `${M}/sketch-c.webp`, alt: "Paper wireframes for Direction C, a stepper through the phases of an event", label: "C · Phases" },
          ],
        },
        { kind: "p", text: "After reviewing them, I didn’t think any of the three could work by itself. The profile keeps a history but nobody talks in it, the thread has the conversation but it disappears, and the phases stop being useful when the event is over." },
      ],
    },
    {
      label: "Direction",
      title: "Solution: put the conversation on the event page",
      blocks: [
        { kind: "p", text: "So I combined them. The conversation from the thread moves onto the event page itself, where it can’t just be muted and where it stays as a record, like the profile. From the phases I took the idea that different things should show up before and after the event. I looked at Partiful for how warm it sounds, and at Beli for how seeing what your friends are doing makes you want to join in." },
        { kind: "wide", src: `${M}/sketch-d.webp`, alt: "Paper wireframes for the combined direction: explore rows, an activity area, personal messages and a profile", caption: "The combined direction on paper, before I moved to Figma." },
        { kind: "p", text: "One thing I kept checking while designing: does this screen sound like a person talking to me, or like the app announcing an event?" },
      ],
    },
    {
      label: "Choosing",
      title: "How do you pick an event when the cards all look alike?",
      blocks: [
        { kind: "p", text: "Explore right now is one long list under a row of filters. From the cards alone, Amy can’t tell what the crowd is like, and Josh can’t tell which groups are still active." },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-explore.webp`, alt: "Meetup’s current Explore screen: filter chips and a single list of large event cards", label: "Before" },
            { src: `${M}/after-explore.webp`, alt: "Redesigned Explore: rows titled Trending in New York, Stay Healthy and Tech and industries, with a line on each card saying how many friends are going", label: "After" },
          ],
        },
        { kind: "p", text: "I regrouped the same events into rows, and gave each row a title that feels more like an invitation, like “Trending in New York”, “Stay Healthy” and “Creative souls”. I got the idea from how Netflix names its rows. You can see more events on one screen this way, and the title already tells you a bit about the mood." },
        { kind: "p", text: "In the second iteration I added how many of your friends are going to each card. Both testers told me that’s how they decide in real life: if the event sounds interesting, and if someone they know will be there." },
      ],
    },
    {
      label: "Deciding",
      title: "How do you know what you’re walking into?",
      blocks: [
        { kind: "p", text: "The current event page tells you what the event is and when, but not really why you should come or who you’ll meet. The useful parts are under a long description, and the Photos and comments sections are usually empty." },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-event.webp`, alt: "Meetup’s current event page: title, date, location, organizer rating and a long description", label: "Before" },
            { src: `${M}/after-event-top.webp`, alt: "Redesigned event page: a banner saying you and 13 guests are going, a short What to Expect, tags, and who is hosting and going", label: "After" },
            { src: `${M}/after-event-activity.webp`, alt: "The Activity thread on the event page: a text blast from the host, people’s replies such as attending and 50/50, and a box to say something", label: "After · Activity" },
          ],
        },
        { kind: "p", text: "My first pass was only moving things up. “What to expect” became two lines with a Read more, the tags come right after it, and Hosting and Going sit next to each other. I also hid the sections that stay empty until the event is done." },
        { kind: "p", text: "Then I added Activity. When the host sends an update, it shows up there as a text blast in their own words, like what time it starts, what to bring, and “find me in blue t-shirt and a cap”. Under that, people can respond with one tap that they’re attending, interested, or 50/50. When you can see the host and members talking, the group looks alive, and that’s what Josh was unsure about." },
        { kind: "p", text: "The downside is the page got longer. That’s why I was careful with the order, so the things you need to decide come first and the conversation comes after." },
      ],
    },
    {
      label: "Waiting",
      title: "What should a notification sound like?",
      blocks: [
        { kind: "p", text: "Between the RSVP and the actual day, Josh “second-guesses the plan until the day arrives.” The notifications Meetup sends during that time are mostly announcements, like a new group just started or last chance to get your spot." },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-notifications.webp`, alt: "Meetup’s current notifications: a list of system announcements about new groups and last chances", label: "Before" },
            { src: `${M}/after-notifications.webp`, alt: "Redesigned notifications: Fany invited you to an event, Jorge invited you to join Lucky Cat Mahjong, Karen sent a text blast with her message quoted, and three people you met are going to Flower Making Class", label: "After" },
          ],
        },
        { kind: "p", text: "I rewrote them so each one starts with a person and not with the event. So it says “Jorge invited you to join Lucky Cat Mahjong”, or “Karen sent a text blast” with her message right under it, and you already know where to find her at 10am without opening anything." },
        { kind: "p", text: "The last card says “3 people you met are going to Flower Making Class” with a Join button. I like this one the most, but it only works because of what I added after the event." },
      ],
    },
    {
      label: "After",
      title: "What do you have left the day after an event?",
      blocks: [
        { kind: "p", text: "Meetup already asks “How did you find it?” with five stars when an event ends. That helps the organizer, but as a member you don’t get anything from it." },
        {
          kind: "phones",
          items: [
            { src: `${M}/before-review.webp`, alt: "Meetup’s current prompt after an event: How did you find it, with five stars", label: "Before" },
            { src: `${M}/after-feel.webp`, alt: "Redesigned check-in: the same rating, followed by Who did you meet with attendees to tap", label: "After · Check-in" },
            { src: `${M}/after-post.webp`, alt: "Post your moment: add a photo and a caption", label: "After · Moment" },
            { src: `${M}/after-moments.webp`, alt: "The event’s Activity thread after the event, with photos posted by Karen and by the host", label: "After · On the event" },
          ],
        },
        { kind: "p", text: "I kept the rating and added two more steps to the same sheet. “Who did you meet?” lets you tap the people you talked to, and “Post your moment” lets you add a photo with a caption." },
        { kind: "p", text: "The moments go into the event’s Activity thread, above the host’s earlier messages. This way the empty Photos section finally has real pictures, David has something to thank people for, and the next newcomer can see what the event actually looks like. And the people you tapped are how the app knows to tell you “3 people you met are going” later." },
        { kind: "p", text: "One constraint I assumed is that you can only post after checking in with your ticket. Otherwise people could post about events they never went to." },
      ],
    },
    {
      label: "Testing",
      title: "What I learned from testing it with two people",
      blocks: [
        { kind: "p", text: "Before testing I wrote down six hypotheses and how I’d know if each one was true. For example, I believed that personal wording would feel more inviting than event wording, and that members could find an organizer’s update and act on it without help. I gave them Josh’s situation: you moved to New York a few months ago, it’s Thursday evening, and your weekend is free." },
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
        { kind: "p", text: "I know two classmates is a small test, so I see this as a direction to keep exploring and not as proof that it works." },
      ],
    },
    {
      label: "Reflection",
      title: "What I’m taking from this",
      blocks: [
        { kind: "p", text: "The changes that worked best were the ones I added to screens people already know. When I made something new that overlapped with what was already there, the testers noticed it right away. Next time I want to focus on new features inside the flow people already understand, instead of changing how they think about the app." },
        { kind: "p", text: "I was also surprised by how much of the warmth came from the wording and not the layout. “Jorge invited you” is almost the same notification as before, it just starts with a person." },
        { kind: "p", text: "And I only designed the member’s side. David is a third of my research, so the next thing I’d work on is his view: approving moments, thanking people, and seeing who came back." },
      ],
    },
  ],
};
