export type TimelineEventType =
  | "incident"
  | "leak"
  | "witness"
  | "government"
  | "discovery"
  | "update";

export interface TimelineEntry {
  year: string;
  type: TimelineEventType;
  title: string;
  summary: string;
  source?: string;
  evidenceScore?: number;
}

// Per-investigation timeline data keyed by investigation id
export const investigationTimelines: Record<string, TimelineEntry[]> = {
  "area-51": [
    {
      year: "1947",
      type: "incident",
      title: "Roswell Crash",
      summary: "Reports of a downed object near Roswell, NM redirect military interest toward secret test sites in Nevada.",
      source: "Army Air Force Press Release",
    },
    {
      year: "1951",
      type: "government",
      title: "Site Selection Begins",
      summary: "CIA and USAF surveyors scout remote Nevada dry-lake beds for a classified flight-test facility.",
      source: "CIA Declassified Files, 2013",
    },
    {
      year: "1955",
      type: "government",
      title: "Groom Lake Activated",
      summary: "Area 51 officially established as a test site for the Lockheed U-2 high-altitude reconnaissance aircraft.",
      source: "CIA History Staff, 1998",
      evidenceScore: 95,
    },
    {
      year: "1957",
      type: "discovery",
      title: "U-2 Overflights of USSR",
      summary: "Spy planes launching from Area 51 photograph Soviet nuclear facilities — triggering a wave of UFO reports from confused airline pilots.",
      source: "NSA Declassified Archive",
      evidenceScore: 98,
    },
    {
      year: "1960",
      type: "incident",
      title: "Gary Powers Shot Down",
      summary: "A U-2 is downed over the USSR, forcing Eisenhower to publicly admit the spy program — partially exposing Area 51.",
      source: "CIA Inspector General Report",
      evidenceScore: 99,
    },
    {
      year: "1964",
      type: "discovery",
      title: "A-12 OXCART Testing",
      summary: "The Mach-3 A-12 OXCART — predecessor to the SR-71 — is tested secretly. Its speed and shape generate hundreds of new UFO sightings.",
      source: "Declassified USAF Records",
      evidenceScore: 95,
    },
    {
      year: "1989",
      type: "witness",
      title: "Bob Lazar Comes Forward",
      summary: "Physicist Bob Lazar claims he reverse-engineered alien propulsion systems at 'S-4', a sub-site near Area 51. Some credentials later confirmed.",
      source: "KLAS-TV Las Vegas Broadcast",
      evidenceScore: 28,
    },
    {
      year: "1995",
      type: "government",
      title: "CIA Acknowledges Existence",
      summary: "For the first time, the CIA officially admits Area 51 exists in a declassified document, though details remain redacted.",
      source: "CIA Freedom of Information Act Release",
      evidenceScore: 100,
    },
    {
      year: "2013",
      type: "leak",
      title: "400-Page History Released",
      summary: "NSA releases comprehensive history of Area 51's U-2 and A-12 programs, confirming decades of covert aviation development.",
      source: "National Security Archive",
      evidenceScore: 100,
    },
    {
      year: "Today",
      type: "update",
      title: "UAP Congressional Hearings",
      summary: "US Congress holds public and classified hearings on Unidentified Aerial Phenomena. Former pilots and intelligence officers testify. Many questions remain.",
      source: "House Armed Services Committee, 2024",
      evidenceScore: 74,
    },
  ],

  "roswell": [
    {
      year: "Jul 1947",
      type: "incident",
      title: "Something Falls Near Roswell",
      summary: "Ranch manager Mac Brazel discovers large quantities of unusual debris scattered across a remote field. He notifies local sheriff.",
      source: "Roswell Daily Record",
    },
    {
      year: "Jul 8, 1947",
      type: "government",
      title: "Army Announces 'Flying Disc'",
      summary: "Roswell Army Air Field public information officer Walter Haut issues a press release confirming capture of a 'flying disc'. The world goes wild.",
      source: "RAAF Press Release",
      evidenceScore: 99,
    },
    {
      year: "Jul 9, 1947",
      type: "government",
      title: "Retraction: 'Weather Balloon'",
      summary: "General Roger Ramey holds a press conference calling the debris a weather balloon. The story is officially dead — for 30 years.",
      source: "Fort Worth Army Air Field Statement",
      evidenceScore: 99,
    },
    {
      year: "1978",
      type: "witness",
      title: "Stanton Friedman Investigation",
      summary: "Nuclear physicist Stanton Friedman tracks down former intelligence officer Jesse Marcel, who says the debris was 'not of this world'.",
      source: "National Enquirer Interview",
      evidenceScore: 42,
    },
    {
      year: "1994",
      type: "government",
      title: "Air Force Report: Project Mogul",
      summary: "The USAF declassifies files attributing Roswell debris to Project Mogul — classified balloon trains monitoring Soviet nuclear tests.",
      source: "USAF Report, 1994",
      evidenceScore: 85,
    },
    {
      year: "1997",
      type: "update",
      title: "50th Anniversary Investigation",
      summary: "CNN, NBC and international media descend on Roswell. A second Air Force report addresses 'alien bodies' claims — attributing them to crash test dummies.",
      source: "USAF Case Closed Report, 1997",
    },
    {
      year: "Today",
      type: "update",
      title: "Declassification Continues",
      summary: "UAP disclosure acts passed by Congress. Roswell remains the defining origin point of modern UFO culture and government secrecy debates.",
      source: "UAP Disclosure Act, 2023",
      evidenceScore: 68,
    },
  ],

  "mkultra": [
    {
      year: "1945",
      type: "government",
      title: "Operation Paperclip Seeds",
      summary: "Nazi scientists with mind-control research backgrounds are recruited by US intelligence, laying groundwork for future programs.",
      source: "OSS Archives",
      evidenceScore: 95,
    },
    {
      year: "1950",
      type: "government",
      title: "Project ARTICHOKE",
      summary: "CIA begins experimenting with hypnosis, forced morphine addiction and LSD as interrogation tools on unwitting prisoners.",
      source: "Church Committee Report",
      evidenceScore: 99,
    },
    {
      year: "1953",
      type: "government",
      title: "MK Ultra Officially Authorised",
      summary: "CIA Director Allen Dulles formally approves Project MK Ultra — 150+ sub-projects across 80 institutions, most kept secret from subjects.",
      source: "CIA Director Memo, April 1953",
      evidenceScore: 100,
    },
    {
      year: "1953",
      type: "incident",
      title: "Frank Olson Dies",
      summary: "CIA scientist Frank Olson falls from a New York hotel window 9 days after being dosed with LSD without consent. Death ruled suicide.",
      source: "New York Medical Examiner",
      evidenceScore: 91,
    },
    {
      year: "1973",
      type: "leak",
      title: "Director Orders Files Destroyed",
      summary: "CIA Director Richard Helms orders all MK Ultra records destroyed ahead of Watergate investigations. Most documents are shredded.",
      source: "Senate Intelligence Committee",
      evidenceScore: 99,
    },
    {
      year: "1977",
      type: "discovery",
      title: "7,000 Documents Survive",
      summary: "A FOIA request uncovers 7,000 misfiled MK Ultra documents in a financial records room. The scandal becomes public.",
      source: "Senate Subcommittee Hearings, 1977",
      evidenceScore: 100,
    },
    {
      year: "1995",
      type: "government",
      title: "Presidential Apology",
      summary: "President Clinton publicly apologises to surviving victims of government-sponsored human radiation experiments, many linked to MK Ultra.",
      source: "White House Statement, 1995",
      evidenceScore: 100,
    },
    {
      year: "Today",
      type: "update",
      title: "Ongoing Declassification",
      summary: "Researchers continue to uncover sub-projects. The full scope of MK Ultra is still unknown — an estimated 20% of documents survived destruction.",
      evidenceScore: 91,
    },
  ],

  "jfk": [
    {
      year: "Nov 22, 1963",
      type: "incident",
      title: "Assassination in Dallas",
      summary: "President Kennedy is shot in Dealey Plaza. Texas Governor Connally is also wounded. Lee Harvey Oswald is arrested hours later.",
      source: "Dallas Police Department",
      evidenceScore: 100,
    },
    {
      year: "Nov 24, 1963",
      type: "incident",
      title: "Oswald Shot Live on TV",
      summary: "Jack Ruby shoots Lee Harvey Oswald in the Dallas police basement — witnessed by millions on live television.",
      source: "NBC News Broadcast",
      evidenceScore: 100,
    },
    {
      year: "1964",
      type: "government",
      title: "Warren Commission: Lone Gunman",
      summary: "The Warren Commission concludes a single shooter — Lee Harvey Oswald — was solely responsible. The 'magic bullet' theory is introduced.",
      source: "Warren Commission Report",
      evidenceScore: 71,
    },
    {
      year: "1979",
      type: "government",
      title: "House Select Committee: Conspiracy",
      summary: "A second investigation concludes Kennedy was 'probably assassinated as a result of a conspiracy', based on acoustic evidence.",
      source: "HSCA Final Report",
      evidenceScore: 71,
    },
    {
      year: "1991",
      type: "update",
      title: "Oliver Stone's JFK Released",
      summary: "The film sparks public outcry, directly leading Congress to pass the JFK Records Collection Act — forcing document release.",
      source: "JFK Records Act, 1992",
    },
    {
      year: "2017–2023",
      type: "leak",
      title: "Batch Declassifications",
      summary: "Trump and Biden administrations release over 15,000 previously secret CIA and FBI documents. Key files still redacted until 2039.",
      source: "National Archives",
      evidenceScore: 71,
    },
    {
      year: "Today",
      type: "update",
      title: "Final Files Still Withheld",
      summary: "Despite legal deadlines, hundreds of documents remain classified. Intelligence agencies cite ongoing 'national security' concerns.",
      source: "NARA Status Report, 2024",
      evidenceScore: 71,
    },
  ],

  "dyatlov-pass": [
    {
      year: "Jan 1959",
      type: "incident",
      title: "Group Sets Off",
      summary: "10 experienced hikers led by Igor Dyatlov begin their trek through the Ural Mountains toward Otorten peak. One turns back due to illness.",
      source: "Ural Polytechnic Institute Records",
    },
    {
      year: "Feb 1, 1959",
      type: "incident",
      title: "Last Known Camp",
      summary: "The group's last diary entries and photographs show them setting up camp on the slope of Dead Mountain. Nothing unusual is noted.",
      source: "Recovered Diaries",
      evidenceScore: 99,
    },
    {
      year: "Feb 26, 1959",
      type: "discovery",
      title: "Search Party Finds Empty Tent",
      summary: "Rescuers find the tent cut open from inside. Nine sets of footprints lead into the snow — some barefoot. No sign of the hikers.",
      source: "Soviet Search Party Report",
      evidenceScore: 99,
    },
    {
      year: "Mar 1959",
      type: "discovery",
      title: "Bodies Found",
      summary: "Five bodies recovered near the forest. No external injuries. Cause of death: hypothermia. Three had fled the tent in their underwear.",
      source: "Soviet Medical Examiner",
      evidenceScore: 99,
    },
    {
      year: "May 1959",
      type: "discovery",
      title: "Four More Bodies — Severe Injuries",
      summary: "The final four are found buried under snow. Massive internal injuries: crushed ribs, fractured skull — yet no external wounds. One is missing her tongue.",
      source: "Soviet Forensic Report",
      evidenceScore: 99,
    },
    {
      year: "1959",
      type: "government",
      title: "Case Closed: 'Unknown Force'",
      summary: "Soviet investigators officially attribute the deaths to an 'unknown compelling force'. Files are sealed for 30 years.",
      source: "Soviet Prosecutor's Office",
    },
    {
      year: "2019",
      type: "government",
      title: "Russia Reopens Investigation",
      summary: "Russian prosecutors reopen the case. Their conclusion: the group was killed by an avalanche. Many experts dispute this explanation.",
      source: "Russian Prosecutor General",
      evidenceScore: 55,
    },
    {
      year: "Today",
      type: "update",
      title: "Debate Continues",
      summary: "Researchers propose infrasound, katabatic wind events, and military testing. The case remains officially unsolved to many.",
      evidenceScore: 55,
    },
  ],

  "philadelphia-experiment": [
    {
      year: "1943",
      type: "incident",
      title: "USS Eldridge in Service",
      summary: "The destroyer escort USS Eldridge is commissioned. According to later claims, it becomes the subject of a classified Navy invisibility experiment.",
      source: "Naval Records",
    },
    {
      year: "1956",
      type: "witness",
      title: "Carlos Allende's Letters",
      summary: "A man named Carlos Allende mails annotated copies of Morris Jessup's UFO book to the Navy, claiming to have witnessed the experiment firsthand.",
      source: "ONR Records",
      evidenceScore: 12,
    },
    {
      year: "1979",
      type: "discovery",
      title: "Story Goes Mainstream",
      summary: "Charles Berlitz and William Moore publish 'The Philadelphia Experiment', bringing the story to mass audiences.",
      source: "Published Book",
      evidenceScore: 22,
    },
    {
      year: "1984",
      type: "witness",
      title: "Al Bielek Claims",
      summary: "Man claiming to be 'Ed Cameron' says he was aboard the Eldridge and teleported to 1983. Claim widely disputed.",
      source: "Lecture Circuit",
      evidenceScore: 5,
    },
    {
      year: "1999",
      type: "government",
      title: "Navy Denies Everything",
      summary: "Navy releases official statement and ship logs. The USS Eldridge was not in Philadelphia on the alleged dates — it was in the Bahamas.",
      source: "US Navy Official Statement",
      evidenceScore: 99,
    },
    {
      year: "Today",
      type: "update",
      title: "Classified Degaussing Programs",
      summary: "Researchers point to real classified Navy degaussing (demagnetisation) experiments that may have inspired the legend.",
      source: "Naval History & Heritage Command",
      evidenceScore: 22,
    },
  ],

  "pentagon-uap": [
    {
      year: "2004",
      type: "incident",
      title: "USS Nimitz Encounter",
      summary: "Navy pilots encounter a white Tic-Tac shaped object off San Diego. It performs manoeuvres impossible for known aircraft. Video is recorded.",
      source: "US Navy Pilot Testimony",
      evidenceScore: 92,
    },
    {
      year: "2007",
      type: "government",
      title: "AATIP Program Begins",
      summary: "Pentagon secretly funds the Advanced Aerospace Threat Identification Program to investigate UAP reports. Budget: $22 million.",
      source: "Pentagon Budget Documents",
      evidenceScore: 95,
    },
    {
      year: "2017",
      type: "leak",
      title: "New York Times Exposé",
      summary: "The New York Times breaks the story of AATIP's existence. The Tic-Tac, Gimbal and Go Fast videos leak to the public.",
      source: "New York Times, Dec 2017",
      evidenceScore: 99,
    },
    {
      year: "2020",
      type: "government",
      title: "Pentagon Officially Releases Videos",
      summary: "The Department of Defense officially releases the three UAP videos and acknowledges they show 'unidentified aerial phenomena'.",
      source: "DoD Press Release, April 2020",
      evidenceScore: 100,
    },
    {
      year: "2021",
      type: "government",
      title: "ODNI Preliminary Assessment",
      summary: "Intelligence report on 144 UAP incidents confirms: 143 remain unexplained. One attributed to deflating balloon.",
      source: "ODNI Preliminary Assessment",
      evidenceScore: 95,
    },
    {
      year: "2023",
      type: "witness",
      title: "Grusch Whistleblower Testimony",
      summary: "Former intelligence official David Grusch testifies to Congress that the US has retrieved 'non-human' craft and biologics. Claims denied by DoD.",
      source: "House Oversight Committee Hearing, 2023",
      evidenceScore: 60,
    },
    {
      year: "Today",
      type: "update",
      title: "UAP Disclosure Act",
      summary: "Congress passes legislation requiring mandatory declassification of UAP-related government records over the next 25 years.",
      source: "UAP Disclosure Act, 2023",
      evidenceScore: 79,
    },
  ],
};

// Fallback timeline generator from investigation fields
export function getFallbackTimeline(
  year: string | undefined,
  title: string,
  description: string,
  category: string
): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  if (year) {
    entries.push({
      year,
      type: "incident",
      title: `The ${title} Begins`,
      summary: description,
    });
  }
  entries.push({
    year: "Today",
    type: "update",
    title: "Investigation Ongoing",
    summary: `Research and investigation into ${title} continues. New evidence and witness testimony are regularly reviewed.`,
  });
  return entries;
}
