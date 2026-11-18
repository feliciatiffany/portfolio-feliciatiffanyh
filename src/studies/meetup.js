// Case study: Meetup. Rendered by src/pages/StudyStory.jsx.
// The order and wording follow Fany's storyboard (FigJam, section "portfolio"), with the grammar fixed:
// the question, overview, problem, the solution up front, then how she got there (research, what it
// showed, opportunities, ideas, the changes, testing, lessons).
// Each section is { label (short, also the left section list), title, blocks: [...] }.
// Block kinds: p, h (small heading inside a section), aside, wide (one image), strip (all screens in
// one row), phones (screens side by side with a tag), quotes, cards, list, stages, wires.
const M = "/media/study/meetup";

export default {
  slug: "meetup",
  title: "How might Meetup turn a first RSVP into a lasting community?",
  meta: [
    { label: "Timeline", value: "Sep – Oct 2026" },
    { label: "Scope", value: "User research, product design, prototyping, user testing" },
    { label: "Type", value: "Concept · class project, solo" },
  ],
  cover: { src: `${M}/cover.webp`, alt: "Four redesigned Meetup screens: Explore, the event page, Notifications and the after-event check-in" },

  sections: [
    {
      label: "Overview",
      title: "Meetup shows up as the first option to connect with people...",
      blocks: [
        { kind: "p", text: "Meetup gives people a lot of options for social networking and for finding or organizing events." },
        { kind: "video", src: `${M}/meetup-reviews-the-but.mp4`, alt: "Animated reviews of Meetup.com: people say it helped them make friends, meet new people and step out of their comfort zone" },
      ],
    },
    {
      title: "It’s easy to join the first time, but hard to stay",
      blocks: [
        { kind: "p", text: "The challenge is what happens next. The app feels empty: event pages rarely show what a group’s vibe is actually like, there’s little interaction between members, and there are very few signals to build trust in an event. There’s little reason to come back." },
      ],
    },
    {
      label: "Solution",
      title: "So the solution I’m proposing",
      blocks: [
        { kind: "p", text: "Set up the vibe! I added a few features along the way to an event, so the app feels like people are already there before you arrive, and still there after it ends." },
        {
          kind: "features",
          items: [
            { src: `${M}/solution-greeting.webp`, alt: "The home screen greets you by name: Hey Fany, new to NYC? Let’s find your people.", title: "A personal home screen", text: "The home screen talks to people, with rows titled like an invitation." },
            { src: `${M}/solution-updates.webp`, alt: "Josh’s text blast on the event card, with Jorge joining", title: "Organizer updates on the card", text: "The host’s text blast shows right on the event card, for fast updates." },
            { src: `${M}/solution-invites.webp`, alt: "Fany invited you to join this event, and Karen is interested", title: "Person-to-person invites", text: "Invites now come from a person, and you can see who’s interested and who’s joining." },
            { src: `${M}/solution-people.webp`, alt: "From your people: Karen went to Flower Making Class, with her photos", title: "From your people", text: "After an event, the moments people post show up, so we can see what the event was really like." },
          ],
        },
      ],
    },
    {
      label: "Research",
      title: "How I found it",
      blocks: [
        { kind: "p", text: "I love going to events, meeting new people and trying new stuff. But after going to some events through Meetup, I got bored with the app and I couldn’t find a sense of community in it. I was wondering if other people felt the same, so I started searching." },
        { kind: "h", text: "Insight: I wondered about and identified what people struggle with online" },
        { kind: "p", text: "I gathered online evidence from App Store reviews, community threads, Reddit and other sites I found on Google to see what people say." },
        {
          kind: "quotes",
          items: [
            { text: "Meetup (went to 3 events, spoke to nobody for more than 5 minutes)", source: "Reddit, r/Adulting", href: "https://www.reddit.com/r/Adulting/comments/1ry40c8/making_friends_as_an_adult_is_genuinely_broken/" },
            { text: "Tried Meetup, but most groups seem pretty dead.", source: "Reddit, r/AskTheTravelers", href: "https://www.reddit.com/r/AskTheTravelers/comments/1x4q9cw/any_genuine_solo_travel_groups_worth_joining/" },
            { text: "…last time I used it most of the groups were dead or two very strange men in a room playing board games, lol.", source: "Reddit, r/childfree", href: "https://www.reddit.com/r/childfree/comments/1wode35/i_feel_like_due_to_being_childfree_i_have_no_real/pbmsj4l/" },
            { text: "I’m not going to pay these guys any more money for a group that’s no longer active.", source: "App review, 1 star", href: "https://apps.apple.com/us/app/meetup-social-events-groups/id375990038?see-all=reviews" },
            { text: "Meetup is an empty shell.", source: "ComplaintsBoard, 2024", href: "https://www.complaintsboard.com/meetup-b118669" },
            { text: "…finding a group on meetup only to discover that it’s a ghost group", source: "Hacker News", href: "https://news.ycombinator.com/item?id=32676728" },
            { text: "It’s clear that many “attendees” RSVP “yes” to signal interest, but have no intention of actually going.", source: "SmartCustomer review", href: "https://www.smartcustomer.com/reviews/meetup.com?page=5" },
            { text: "For a social group it is important to see who is attending an event. You make this almost impossible.", source: "Trustpilot, 2 stars", href: "https://ca.trustpilot.com/review/meetup.com" },
          ],
        },
        { kind: "p", text: "And three main struggles came up again and again:" },
        {
          kind: "quotes",
          items: [
            { text: "Is this group even still active?", source: "The event and the app look empty" },
            { text: "Should I message a stranger to ask?", source: "New event joiners can’t get enough information" },
            { text: "The happy path ends at the ticket.", source: "Nothing brings people back" },
          ],
        },
        { kind: "h", text: "Three opportunities, mapped to the journey" },
        { kind: "p", text: "At the same time, I mapped all the happy paths." },
        { kind: "video", src: `${M}/happy-paths-mapping.mp4`, alt: "A timelapse of the happy-path board filling in: sign-up, questionnaire, filter, joining an event, saving an event, joining and creating a group, group features, creating an event, event settings and chat", caption: "Every happy path I mapped in Meetup, from sign-up to chat." },
        { kind: "p", text: "Mapping out the user flow helped me find some gaps, backed up by the three main struggles from people’s reviews." },
        {
          kind: "opps",
          stages: ["Find", "Decide", "RSVP", "Wait", "Attend", "After"],
          items: [
            { title: "Before deciding", from: 1, to: 2, video: `${M}/meetup-journey-1-before-deciding.mp4`, problem: "Is this group even still active?", note: "The event and the app look empty.", text: "Learn more about the attendees and their bios." },
            { title: "Before going", from: 3, to: 4, video: `${M}/meetup-journey-2-before-going.mp4`, problem: "Should I message a stranger to ask?", note: "New event joiners can’t get enough information.", text: "Know before you go, customized to each user." },
            { title: "After the event", from: 5, to: 6, video: `${M}/meetup-journey-3-after-the-event.mp4`, chosen: true, problem: "The happy path ends at the ticket.", note: "Nothing brings people back.", text: "A two-way connection between members and organizers, and personal invitations, to increase participation and build the vibe." },
          ],
        },
        { kind: "p", text: "I chose number 3 because, in interviews I did with some friends, they said the main reason they go to an event is either knowing the vibe or knowing that their friends are going, and this interaction supports that. The first option was quite good, but it’s part of Meetup’s business model to make money, where learning more means paying more, and it raises privacy concerns. The second option creates more friction in an app that already has so much condensed information, and it’s mainly useful for newcomers." },
        { kind: "h", text: "Exploration: iteration on the go" },
        { kind: "p", text: "With the opportunity chosen, I explored these sketches by studying what other apps with a similar job to be done do well." },
        {
          kind: "cards",
          items: [
            { title: "Beli", tag: "Tracking and ranking restaurants", icon: `${M}/app-beli-icon.webp`, shots: [`${M}/app-beli-1.webp`, `${M}/app-beli-2.webp`], alt: ["Beli’s feed, with featured lists and what friends ranked", "A Beli profile with places been to, rank and current streak"], points: ["Your history is visible and easy to share.", "Clear and easy to navigate.", "Built around achievements."] },
            { title: "Bucket", tag: "Bucket lists with friends", icon: `${M}/app-bucket-icon.webp`, shots: [`${M}/app-bucket-1.webp`, `${M}/app-bucket-2.webp`], alt: ["Bucket’s lists screen: see what you share with others", "Bucket turns a finished goal into a photo story you can share"], points: ["It shows you the goals you share with your friends.", "It turns a finished goal into a small story you can post.", "Customizable."] },
            { title: "Partiful", tag: "Invites for parties and events", icon: `${M}/app-partiful-icon.webp`, shots: [`${M}/app-partiful-1.webp`, `${M}/app-partiful-2.webp`], alt: ["A Partiful invite shared by link, text or DM", "Partiful’s photo album and activity feed, where guests comment and reply"], points: ["Invites feel warm and personal.", "You can see who’s going.", "It shows what guests are saying before the event."] },
          ],
        },
        { kind: "p", text: "Then I sketched some really low-fi wireframes with one main purpose:" },
        { kind: "h", text: "A two-way connection, and more invitations beyond signing up for an event" },
        {
          kind: "carousel",
          items: [
            {
              src: `${M}/sketch-a-paper.webp`,
              clean: `${M}/sketch-a-plain.svg`,
              alt: "Paper sketch of Direction A: a home screen leading to a profile with followers, events been to, groups, badges, and Activity and Challenges tabs",
              title: "A · Profile",
              notes: [
                ["Validate", ["Where to place things, and what’s interesting to see more of", "The bigger picture?", "What’s the hierarchy? Maybe look at it from the pain points", "Is it intimidating?"]],
                ["Pros", ["Long-term motivation through stats and badges", "Shareable and familiar", "Gives everyone a role"]],
                ["Cons", ["A lot of navigation and so much info", "Feels empty for a first-time user", "Stats can feel like pressure", "Member–host talk is slower and less direct than a thread"]],
              ],
            },
            {
              src: `${M}/sketch-b-paper.webp`,
              clean: `${M}/sketch-b-plain.svg`,
              alt: "Paper sketch of Direction B: a Meetup group chat, automated host welcomes, a host view of first-timers and questions, and reminders on the home screen, a widget and a messaging app",
              title: "B · Event thread",
              notes: [
                ["Validate", ["Will people read it, since it isn’t urgent?", "Does it actually help the host, or make it harder because it’s very technical?", "How should the language sound?", "Does it lead to people muting it?"]],
                ["Pros", ["Familiar", "A sense of urgency to read it and notice what needs to be done", "Low learning curve"]],
                ["Cons", ["Once it’s muted, nothing gets through", "Can get noisy and intimidating", "Too much information"]],
              ],
            },
            {
              src: `${M}/sketch-c-paper.webp`,
              clean: `${M}/sketch-c-plain.svg`,
              alt: "Paper sketch of Direction C: a stepper across eight screens, from You’re registered and RSVP to a QR code check-in, Thanks for coming with a picture, and a host report of newcomers",
              title: "C · Phases",
              notes: [
                ["Validate", ["Does the stepper raise the check-in rate?", "Completion rate for each phase", "How often hosts use the “I greeted them” tap"]],
                ["Pros", ["Builds on what’s there now", "Clear at every step", "Less overwhelming", "Organizer and member stay in sync"]],
                ["Cons", ["Too structured, so less free-form conversation", "People may not open it after the event", "Feels very much like a task", "Short-term"]],
              ],
            },
          ],
        },
        { kind: "p", text: "I combined the strongest parts into Direction D: two-way, warm and social. It combines parts of the profile, the conversation from the event thread, and the idea that different things should show up before and after the event. I looked at Partiful for how warm it sounds, and at Beli for how seeing your friends’ activity makes you want to join in." },
        {
          kind: "merge",
          into: "Direction D",
          items: [
            { from: "A · Profile", took: "A record of the events you’ve been to, with badges", to: 5, screen: "Profile" },
            { from: "B · Event thread", took: "The conversation, moved onto the event page", to: 4, screen: "Event page" },
            { from: "C · Phases", took: "Different things before and after the event", to: 1, screen: "Home" },
            { from: "Partiful", took: "Warm, personal invitations from a person", to: 3, screen: "Invite" },
            { from: "Beli", took: "Seeing your friends’ activity makes you want to join", to: 6, screen: "Activity" },
            { from: "Netflix", took: "Rows of events titled like an invitation", to: 2, screen: "Explore" },
          ],
        },
        {
          kind: "pair",
          src: `${M}/sketch-d-paper.webp`,
          clean: `${M}/sketch-d-plain.svg`,
          alt: "Paper sketches for Direction D: a profile with events been to and badges, your activity, invitations, and an Explore page with titled rows",
          cleanAlt: "Direction D redrawn as six clean wireframes: 1 Home, 2 Explore, 3 Invite, 4 Event page, 5 Profile, 6 Activity",
          caption: "Direction D, sketched on paper and redrawn",
        },
        { kind: "h", text: "I conducted user testing" },
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
        { kind: "p", text: "What they found interesting when joining an event was the short “what to expect”, the tags, and being able to see who is going. One of them also pointed out the way the thread shows a name, their text and the reactions. Both said that in real life they decide based on whether the event sounds interesting and whether someone they know is going, which is what these features try to show." },
        {
          kind: "iterate",
          label: "Iteration 2",
          src: `${M}/iteration-2-purple.svg`,
          alt: "The final wireframe as four screens, with each update to the Meetup app highlighted in purple: 1 Home with a greeting that talks to you, 2 Notifications where every alert starts with a person, 3 the Activity thread with the host’s update and everyone’s replies, 4 after the event, who you met and your moment",
          caption: "Iteration 2: the final wireframe, adding updates to the Meetup app",
        },
        { kind: "p", text: "For the final iteration, I kept the profile and the individual invite so the change wouldn’t shift the whole mental model of the business. Instead, I pushed further on notifications and on the interaction between members and organizers before and after the event." },
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
      label: "Learned",
      title: "What I learned",
      blocks: [
        { kind: "p", text: "This is my first product design project since I got really interested in it, and I learned a lot more than I expected: from the early process, step by step, to the technical side, especially working in Figma. Building user personas and expanding ideas (the double diamond of this process) was a lot of work, but it gave me a much better chance of finding the right design." },
        { kind: "p", text: "I also learned more about where design and the business model overlap, especially how an app makes revenue, and design decisions should consider that. For example, the idea of showing more about who’s coming, like their details and where they’re from, is exactly where Meetup’s subscription comes in. A change like that should be discussed with other teams before a design decision is made. It also raised bigger questions: what is the main thing that makes people go to an event, and how do you separate that main attraction from where the revenue comes from?" },
        { kind: "h", text: "What surprised me" },
        { kind: "p", text: "From the beginning I felt something about Meetup was missing, but I didn’t know what it was. Tracing it and learning from other users gave me the answer. It clicked once I found the theory behind it: what was missing, and why it made sense. People say to trust your gut feeling, and there’s a reason behind that saying." },
        { kind: "p", text: "I was also surprised by how much complexity and how many design decisions sit behind small features. My professor, Eric Li, who taught my product design class, showed me so many surprising decisions and words in product design and design engineering." },
      ],
    },
  ],
};
