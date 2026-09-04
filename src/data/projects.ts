export type Tag = 'Robotics' | 'Hardware' | 'Machine Learning' | 'Medical' | 'Data'

export const TAGS: Tag[] = ['Robotics', 'Hardware', 'Machine Learning', 'Medical', 'Data']

export interface ProjectImage {
  src: string
  alt: string
  caption: string
}

export interface Project {
  id: string
  title: string
  eyebrow: string
  period: string
  tags: Tag[]
  summary: string
  body: string[]
  figures?: { label: string; value: string }[]
  images?: ProjectImage[]
  stack?: string[]
  repo?: string
  demo?: 'pneumatic'
  demoLabel?: string
  /** The four projects Sam wants front and centre — larger cards, more images, on the main grid. */
  featured?: boolean
}

// Content sourced directly from Sam's MSc thesis, project write-ups and
// existing site copy. Numbers are not rounded or changed. Nothing here is
// invented — where a detail wasn't in the brief, it's left out rather than
// guessed.
export const projects: Project[] = [
  {
    id: 'mr-safe-actuation',
    title: 'MR-safe pneumatic actuation for robot-assisted endovascular surgery',
    eyebrow: 'MSc thesis · UCL Medical Physics & Biomedical Engineering',
    period: 'Oct 2025 – Jul 2026',
    tags: ['Robotics', 'Hardware', 'Medical'],
    featured: true,
    summary:
      'A three-chamber pneumatic rotary actuator for MR-guided catheter driving — the mechanical actuator was supplied hardware, the pneumatic and electrical drive systems, the firmware, and the bench-measured diagnosis of where it was actually losing pressure were mine.',
    body: [
      'MRI images soft tissue in real time without radiation, but nothing ferrous or electrically active can go near the bore. The actuator itself — a three-chamber rolling-diaphragm mechanism that turns a wavy cam through sequential pressurisation — was supplied as existing, pre-fabricated non-metallic hardware; it is not my design. My contribution was everything that drives it: the pneumatic and electrical systems, the control firmware, and the full benchtop characterisation.',
      'I built the pneumatic and electrical drive systems end to end: three solenoid valves, a MOSFET driver board isolating the low-voltage logic from the 24V solenoid supply, and Arduino firmware whose only rule is that exactly one valve is ever energised at a time, cycling A → B → C on repeat. I commissioned it by starting the phase duration at a slow, watchable 1500 ms and stepping it down — 1000, 500, 250, 125, 63 ms — until I found the fastest period that still ran without stalling: 60 ms. I also built the instrumentation bench — compressor, regulator, pressure and force gauges, a torque sensor — and ran the full test programme on it myself.',
      "Measured torque and speed cleared the catheter-driving requirement by more than an order of magnitude, so the mechanism was never the constraint. What mattered was where the supply pressure actually went. I mapped pressure at every node in the circuit under continuous cycling rather than trusting the regulator's setpoint, and found 27% of it — 0.16 bar — disappearing at the valve stage itself: not a leak, not one bad unit, but the finite flow capacity of that solenoid valve type at a 60 ms phase. Valve and transmission redesign, not the mechanism, is what future work needs to chase.",
    ],
    images: [
      {
        src: 'img/actuator.webp',
        alt: 'Assembled three-chamber pneumatic actuator, 3D printed in non-metallic materials',
        caption:
          'The assembled actuator. Every component that enters the scanner bore is non-metallic and 3D-printed, to ASTM F2503.',
      },
      {
        src: 'img/mr_architecture.webp',
        alt: 'System architecture diagram showing the control-room electronics separated from the non-metallic actuator in the scanner room',
        caption:
          'The whole design in one diagram. Every electrically active component — Arduino, MOSFET driver, valves, compressor — stays in the control room; only air and the passive plastic actuator cross into the scanner room, which is what the MR-Safe classification actually rests on.',
      },
      {
        src: 'img/bench.webp',
        alt: 'Pneumatic test bench with compressor, regulator, solenoid valves, torque sensor and gauges',
        caption:
          'The instrumentation bench: compressor, regulator, three solenoid valves, torque sensor, pressure and force gauges.',
      },
    ],
    stack: ['Pneumatics', 'Arduino firmware', 'MOSFET drive electronics', 'Benchtop instrumentation', 'Experimental characterisation'],
    demo: 'pneumatic',
    demoLabel: 'Watch the valve sequence live',
  },
  {
    id: 'emg-exoskeleton',
    title: 'EMG-controlled soft exoskeleton',
    eyebrow: 'Assistive technology · University of Reading',
    period: 'Oct 2024 – Feb 2025',
    tags: ['Hardware', 'Medical', 'Robotics'],
    featured: true,
    summary:
      'A single EMG sensor driving a McKibben pneumatic assist for a forearm that fatigues — four actuator rebuilds, each one driven by a material failing under real pressure, not a redesign on paper.',
    body: [
      'A wearable forearm assist for people with muscle weakness. A single forearm-mounted EMG sensor detects the wearer tensing; an Arduino drives a pump through MOSFETs to inflate a McKibben pneumatic muscle, and opens a solenoid to release it once the wearer relaxes. The intent is simple: the device should amplify what the wearer is already trying to do, not act on its own.',
      'McKibben muscles were the obvious starting point for something that has to sit against a person’s arm: a braided sleeve over an inflatable bladder contracts axially under pressure, which behaves far more like a real muscle than a rigid gear or motor ever could, and it fails soft rather than sharp if something goes wrong close to skin. That compliance is also exactly why it took four attempts to get right — a material that gives under pressure also gives out under pressure, in ways a metal linkage simply doesn’t.',
      'Four actuator generations went into it, each revision driven by something failing in testing rather than by redesigning on paper. A single latex balloon in a braid proved the principle and burst around 12–15 psi. A double balloon cut how often it ruptured but stayed leak-prone under higher pressure. Four of the double-balloon muscles run in parallel gave more force and eight balloons’ worth of leak points and anchors that couldn’t hold the combined tension. The version that held was a single silicone tube, because silicone tolerated pressure up toward 20 psi without rupturing — which also meant one actuator did the job four were being asked to do.',
      'Sensor placement mattered almost as much as the actuator. An early EMG sensor gave noisy, unreliable readings; switching to a MyoWare sensor fixed that. Placement mattered too — over the bicep or triceps the signal was inconsistent, but over the forearm it read clearly, so the controller could just watch for that one channel crossing a calibrated threshold rather than trying to decode the signal in detail. Simpler detection meant fewer ways for the control loop to get it wrong on someone who isn’t a lab technician.',
      'The control logic is deliberately plain: idle defaults to vented, a detected contraction runs the pump for a fixed duration, and the system then waits for the signal to stay below threshold for half a second — confirming the wearer has actually relaxed — before it releases pressure. Inflation is always bounded and idle is always vented, so the device can fail to help, but it can’t fail by staying inflated indefinitely, which mattered more than smarter control given who this has to work for.',
    ],
    images: [
      {
        src: 'img/exo.webp',
        alt: 'A single McKibben muscle actuator: a braided sleeve over a silicone bladder, secured with hose clamps',
        caption:
          'The McKibben muscle itself — a braided sleeve over a silicone bladder, clamped at both ends. This is what the whole device is built around.',
      },
      {
        src: 'img/exo_worn.webp',
        alt: 'The complete assistive device worn: shoulder anchor, forearm strap, actuator and EMG electrode',
        caption:
          'The finished device in use — shoulder anchor, forearm strap, actuator and EMG electrode. It had to be something a person could put on and forget about.',
      },
      {
        src: 'img/exo_lift.webp',
        alt: 'Wearing the exoskeleton while lifting a bag off a chair, testing the assist under a real load',
        caption: 'Testing the assist directly, under a real load — the same trial-based check used after every rebuild.',
      },
      {
        src: 'img/exo_box.webp',
        alt: 'Control box internals: Arduino UNO, three MOSFET switching modules, breadboard and indicator LEDs',
        caption:
          "Inside the control box: Arduino, three MOSFET switching modules, and LEDs that tell the wearer whether it's inflating or venting.",
      },
      {
        src: 'img/emg_four.webp',
        alt: 'Four braided McKibben muscles bundled together with pneumatic fittings',
        caption: 'Generation three: four braided muscles manifolded together. More force, four times the places it could leak.',
      },
      {
        src: 'img/emg_mosfet.webp',
        alt: 'Four MOSFET switching modules wired on a breadboard, one per actuator channel',
        caption: 'The switching stage on the bench, before it moved into the control box: one MOSFET module per channel.',
      },
      {
        src: 'img/emg_solder.webp',
        alt: 'Hand-soldering and terminating the EMG sensor wiring loom on the workbench',
        caption: 'Most of the four rebuilds were re-wiring and re-terminating this loom, not redesigning anything on paper.',
      },
    ],
    stack: ['EMG sensing', 'Arduino', 'MOSFET switching', 'Pneumatics', 'State-machine control'],
    repo: 'https://github.com/sammytsang/emg-assistive-control',
  },
  {
    id: 'vision-prosthetic-hand',
    title: 'Webcam-controlled robotic prosthetic hand',
    eyebrow: 'Prosthetics & computer vision · University of Reading',
    period: 'Jan – Mar 2024 · group project · department showcase selection',
    tags: ['Robotics', 'Hardware'],
    featured: true,
    summary:
      'Vision-to-motor pipeline — webcam, hand tracking, five Dynamixel servos — mapping joint angles rather than landmark positions so the grip holds up at any distance from the camera.',
    body: [
      'A vision-to-motor pipeline: webcam, hand tracking, five Dynamixel servos driving a 3D-printed hand. When the group fell behind schedule, I proposed switching to Brunel’s Hand — an existing open-source prosthetic design — as the mechanical base rather than continuing to design one from scratch, and the group adapted our tendon-driven mechanism onto it. I led assembly, material selection and the iteration that followed; 3D printing was split across three of us. Selected for the department showcase, where I ran the live demonstration and explained it to non-engineers.',
      'The design decision that made it work: map joint angles, not landmark positions. Coordinates depend on how far you are from the camera, so a system built on them works at one distance and nowhere else. Angles are invariant to distance and framing, so the same gesture produces the same grip whether you’re at the desk or across the room. Every finger is normalised against its own open and closed extremes, and commands are clamped to the servo’s mechanical limits.',
      'Getting there took two rounds of assembly. ASA gave the structure the durability it needed, TPU the elasticity for the tendon ligaments, and Kevlar strings the strength to survive repeated pulls without breaking — but the first print run had holes that needed drilling out by hand and ligaments distorted enough to need manual trimming. The first calibration pass, on a cardboard test rig with short strings, worked but flexed under its own tension; rebuilding it on an acrylic platform with longer, properly wrapped strings — using everything the first round had taught us — made the second pass markedly faster, and the finished hand held a ping-pong ball reliably, though heavier objects were still beyond it.',
    ],
    images: [
      {
        src: 'img/hand_rig.webp',
        alt: 'Prosthetic hand mounted on an aluminium frame above five servos, with mapping code on the monitor behind',
        caption: 'The build. Five AX-12A servos on an extruded aluminium frame, tendon-driven fingers.',
      },
      {
        src: 'img/hand_lift.webp',
        alt: 'The prosthetic hand gripping and holding a boxed product',
        caption: 'Grip under load. The same calibrated mapping that mirrors a gesture also holds a real object.',
      },
      {
        src: 'img/hand.webp',
        alt: 'The assembled hand and driver box on a desk, mid-build',
        caption: 'On the bench mid-build — the driver electronics live in the box the hand is mounted on.',
      },
      {
        src: 'img/hand2.webp',
        alt: 'The prosthetic hand demonstrated in front of a University of Reading branded monitor',
        caption: 'Set up for the department showcase, where I ran the live demo for non-engineers.',
      },
    ],
    stack: ['OpenCV', 'MediaPipe', 'Dynamixel AX-12A', '3D printing', 'ASA/TPU/Kevlar construction'],
    repo: 'https://github.com/sammytsang/vision-prosthetic-hand',
  },
  {
    id: 'slam-trajectory-eval',
    title: 'Visual SLAM implementation and evaluation',
    eyebrow: 'Robotics & perception · UCL',
    period: 'Python & C++ · ORB-SLAM2',
    tags: ['Robotics', 'Machine Learning'],
    summary:
      'Systematic ablations on monocular ORB-SLAM2, because a system can keep outputting poses while being severely wrong — and trajectory error alone can’t tell you which one happened.',
    body: [
      'I evaluated monocular ORB-SLAM2 on two very different sequences: KITTI 07, a long outdoor driving route with loop-closing revisits, and a long indoor TUM RGB-D sequence with close structure and slower motion. Since monocular SLAM has no absolute scale, every estimated trajectory was Sim(3)-aligned to ground truth before scoring Absolute Trajectory Error.',
      'The point most people miss: the pipeline never crashes and never tells you it failed. Cut the feature budget hard enough and it throws "Wrong initialisation, reseting..." internally, recovers, and still writes out a complete trajectory file — one that only reveals how wrong it is once you actually score it against ground truth, over whatever fraction of the run it managed to track. So I reported matched-pose count and evaluated duration alongside every error number, specifically to catch the case where a run looks fine only because it gave up early and got scored on the easy part.',
      "Two ablations made the point concrete. Disabling outlier rejection — patching the tracker to keep matches it would normally reject — wrecked the outdoor route and cut its tracked coverage to a third of normal, but on the indoor sequence coverage barely changed while accuracy still collapsed, which is what confirms it's a genuine accuracy loss there rather than a shorter, easier fragment. Disabling loop closure was the clean split: catastrophic on the outdoor route, which loops back on itself and has real drift to correct, and barely different indoors, where there wasn't much drift to correct in the first place. Same ablation, opposite verdicts, because the two sequences don't stress the same failure mode.",
      "Alongside three coursemates, I ran a second, separate SLAM comparison the same term — this time on data we collected ourselves rather than a public benchmark: a small cluttered room, an indoor loop through the building, and an outdoor loop, each captured with both a camera and a LiDAR. My part was the visual strand — COLMAP and ORB-SLAM2 — and the trajectory evaluation across all three environments. Closing the loop told a more nuanced story than 'loop closure fixes drift': cross-loop separation, how far apart the path's start and end ended up in the reconstructed map, improved by roughly an order of magnitude in the indoor loop and the small room, and about 5× outdoors. But start-to-end trajectory error — a genuinely different measurement — only improved outdoors; it got worse in both the indoor loop and the small room. A map can become far more internally consistent without its endpoint estimate improving, and reporting only one of those two numbers would have hidden that.",
    ],
    figures: [
      { label: 'Cross-loop separation, indoor big loop', value: '3.41 m → 0.14 m' },
      { label: 'Cross-loop separation, outdoor', value: '0.77 m → 0.15 m' },
      { label: 'Start-to-end error, outdoor', value: '1.75 m → 0.28 m' },
    ],
    images: [
      {
        src: 'img/slam_trajectory.webp',
        alt: 'Estimated outdoor trajectory from ORB-SLAM2 plotted against COLMAP, in the horizontal plane',
        caption:
          "The outdoor loop: ORB-SLAM2's estimated path against COLMAP's. The two track each other closely here — outdoor was also the one environment where closing the loop improved trajectory error as well as map consistency, not just the latter.",
      },
    ],
    stack: ['Python', 'C++', 'ORB-SLAM2', 'COLMAP', 'LiDAR SLAM', 'Sim(3) Umeyama alignment (evo)', 'KITTI & TUM RGB-D'],
    repo: 'https://github.com/sammytsang/slam-trajectory-eval',
  },
  {
    id: 'surgical-workflow-cholec80',
    title: 'Surgical workflow recognition on Cholec80',
    eyebrow: 'Surgical data science · UCL',
    period: 'PyTorch · Cholec80 dataset',
    tags: ['Machine Learning', 'Medical'],
    summary:
      'Two related failures on the same laparoscopic video, both hiding behind a plausible headline number — until the fix that actually worked turned out to be giving the model the one thing it was missing: time.',
    body: [
      'Two tasks on the same dataset of laparoscopic cholecystectomy video: predict how much of the operation is left, and recognise which phase is happening now — both really testing whether a single frame carries enough information on its own, or whether the model needs memory.',
      "Predicting remaining time from one frame collapsed straight to guessing the average, every time, regardless of what was on screen. That's not a failed model so much as a correct diagnosis: two operations can look visually identical at very different points depending on how the surgery is going, so a single static frame genuinely doesn't carry what's needed, and confirming that shaped everything after it.",
      'The phase classifier told a similar story with a nastier disguise. It scored well overall — for a first attempt, that reads as a model that has learned something. It hadn’t. It had learned that one phase dominates the dataset, so predicting that phase every time scores reasonably, while it got Clipping/Cutting — the step where the critical view of safety matters clinically — wrong essentially every time. Re-weighting the loss to penalise that shortcut did redirect predictions toward the rare phases, but at an overall accuracy below random guessing for a seven-way task: not a fix, just proof the failure lived in the objective, not the data.',
      'The actual fix was giving the model what both failures were missing: an explicit sense of time. Feeding it the true progress-through-the-operation alongside the visual features — a controlled test of whether temporal context alone resolves the ambiguity — dropped training loss from 1.77 to 0.06 and produced phase tracking that genuinely followed the operation’s real order on video it hadn’t seen. I didn’t report a headline accuracy for that version, deliberately: the loss curve and the qualitative tracking were the honest evidence, and the phase boundaries still flickered — exactly where a proper sequence model needs to go next.',
    ],
    figures: [
      { label: 'Training loss, frame-only → +progress', value: '1.77 → 0.06' },
      { label: 'Phase classes evaluated', value: '7-way' },
      { label: 'Clipping/Cutting recall, loss re-weighted', value: 'below random' },
    ],
    stack: ['PyTorch', 'ResNet-18', 'Leakage-safe video-level splits', 'Paired Wilcoxon testing'],
    repo: 'https://github.com/sammytsang/surgical-workflow-cholec80',
  },
  {
    id: 'biomedical-startup-scouting',
    title: 'Semantic scouting pipeline for biomedical startup partnerships',
    eyebrow: 'Biomedical data science · CUHK-Shenzhen',
    period: 'Futian Biomedical Innovation R&D Centre · Jul–Aug 2025',
    tags: ['Data', 'Machine Learning', 'Medical'],
    summary:
      'A semantic-matching pipeline that scored 121 biomedical startups against a research centre’s actual collaboration priorities, built because the database it needed to run on didn’t exist yet either.',
    body: [
      'The Centre wanted to find startups worth incubating or partnering with, across targeted drug discovery, precision and regenerative medicine, biomedical big data and modernised Traditional Chinese Medicine. There was no ready-made list to search. I built the database first — pulling finalists from four entrepreneurship competitions, adding relevant postings from a recruitment platform, then enriching every company with registration date, contact details and stated field via an enterprise-lookup tool, and filling in the rest by searching each company directly where that lookup came up empty.',
      'Matching each company by hand against the Centre’s priorities doesn’t scale past a few dozen entries, so I embedded every company’s free-text project description and a set of fourteen target-collaboration phrases — things like "AI drug discovery" and "cell therapy R&D" — into the same semantic space with a sentence-transformer model, and scored each company by its best cosine-similarity match. Companies with a missing or placeholder description got a similarity score of exactly zero rather than being silently dropped or, worse, falsely matched on empty text.',
      'A strict ≥0.75 threshold surfaced 9 of the 121 companies as high-confidence candidates, with the top match scoring 0.918 and a clear thematic cluster around AI-driven drug discovery and cell therapy — genuinely close to what the Centre was looking for, not just a plausible-looking list. A much larger band scored 0.4–0.7: worth flagging as later-stage or under-documented rather than either shortlisting or discarding outright. The two source lists behaved differently, too — the competition finalists produced fewer but stronger matches, the recruitment platform produced volume with weaker average fit — which says as much about where strong candidates actually surface as it does about the matching itself.',
    ],
    images: [
      {
        src: 'img/intern_chart.webp',
        alt: 'Bar chart: semantic screen of 121 biomedical start-ups by cosine-similarity band',
        caption:
          'The screen in one chart. 14 had no usable description and scored zero by design; 98 were a partial fit; 9 cleared the ≥0.75 threshold. Ranking the 98 in between was the actual point — without it, someone reads all 121 by hand.',
      },
    ],
    stack: ['Python', 'SentenceTransformers', 'Cosine similarity', 'pandas', 'Multi-source data collection'],
  },
  {
    id: 'spooky-eyes',
    title: 'Spooky Eyes — interactive gaze-following display',
    eyebrow: 'Computer vision & real-time systems · University of Reading',
    period: 'BEng final-year dissertation · 2025',
    tags: ['Robotics', 'Hardware'],
    featured: true,
    summary:
      'Real-time gaze following from a commodity webcam — camera, tracking, rendering, and a physical build that had to run unattended in front of the public.',
    body: [
      'A rigged 3D face whose eyes follow you around the room, driven by an ordinary webcam and nothing else — head position used as a proxy for gaze, trading optical precision for a problem that’s actually about motion quality. Raw detections are jittery, and jitter reads as broken rather than alive, so an exponential moving average damps frame-to-frame noise, a deadzone holds micro-tremor rather than applying it, and neutral is treated as a target eased into by the same filter.',
      'The two decisions I’d defend are both about not blocking. Blender’s interface runs on one thread, so a blocking socket read freezes the viewport — the receiver polls inside a timer callback and never waits, so a stalled tracker degrades to the eyes holding position rather than Blender hanging. And it takes the newest sample instead of draining a queue, so a transient stall drops stale frames rather than replaying them late as visible lag.',
      'It had to run unattended in front of the public at the department showcase — camera, tracking and rendering as one physical build, not a demo that only works with an engineer standing next to it.',
    ],
    images: [
      {
        src: 'img/eyes_live.webp',
        alt: 'The system running: Blender with a rigged face on the left, the face tracker with a live detection box on the right',
        caption: 'Running live. Blender with the rigged model on the left, the tracker with a detection box on the right.',
      },
    ],
    stack: ['OpenCV', 'Caffe SSD face detection', 'Python', 'TCP', 'Blender', '~10 FPS end to end'],
    repo: 'https://github.com/sammytsang/spooky-eyes',
  },
  {
    id: 'job-search-pipeline',
    title: 'Automated job-search pipeline across seven sources',
    eyebrow: 'Personal project · ongoing',
    period: 'Built 2026 · runs daily · ~3,800 lines',
    tags: ['Data'],
    summary:
      'A rules-engine pipeline across seven job sources that reads roughly 120,000 postings a run and hands back the few dozen actually worth opening — the interesting failure was a blacklist that let three completely wrong roles straight through.',
    body: [
      "Job hunting after a masters is a volume problem, not a discovery problem: the postings that actually fit me are buried inside tens of thousands that don't, and every job board is optimised to show more listings rather than the right ones. I was losing evenings to adverts that were wrong on location, wrong on seniority, or not engineering at all, so I built something to do that reading instead of doing it myself every night.",
      "It pulls from seven sources — LinkedIn, jobs.ac.uk, two job-board APIs and four applicant tracking systems — and puts everything through one rules engine: London-commutable only, permanent rather than contract, entry-level rather than senior, engineering rather than trades or IT support. What survives is scored, ranked, and shown with the reason it was kept, so I can tell when the ranking is wrong rather than just trusting it. It runs itself at eight every weekday morning, decides which of three CV variants to attach, tracks what I've already applied to so I never send the same application twice, and writes a health report if any stage looks off.",
      "The first version filtered with a blacklist of banned words, and it worked right up until I actually read what was getting through: an executive-assistant post, a bank product-manager role, an apprenticeship — none of them containing a banned word, so all three sailed past. A blacklist can only remove what I'd already thought to ban. I rewrote it as an allow-list instead, so a listing has to positively look like engineering, research, robotics or data to survive, and anything unfamiliar fails closed rather than open. That single inversion removed more noise than every rule I'd added before it.",
      "It has 34 regression tests because it broke silently, repeatedly, and always looked fine while doing it: a missing bracket in one regular expression quietly discarded seventeen of the best-matching roles in a single run, an over-eager filter cut a genuine engineering role at a company I'd have liked to work for, and a crawler died on an invalid setting while the pipeline kept serving four days of stale results without complaint. None of those announced themselves — every one of the 34 tests exists because something specific went wrong once and I didn't want it happening twice.",
      "I built this with an AI coding assistant directing the implementation, rather than writing every line by hand — I set the requirements, made the design calls, found the bugs, and wrote the tests that caught them. Knowing how to direct these tools well, and when to distrust their output, feels like it's becoming part of the job rather than a shortcut around it.",
    ],
    figures: [
      { label: 'Job records read per run', value: '~120,000' },
      { label: 'Regression tests', value: '34' },
      { label: 'Shortlisted per run', value: 'a few dozen' },
    ],
    images: [
      {
        src: 'img/pipeline_architecture.webp',
        alt: 'Pipeline architecture diagram: seven job sources feeding a rules engine that produces a ranked shortlist, CV choice, application tracker and spreadsheet export',
        caption:
          'Seven sources feed one rules engine, which produces a ranked shortlist, decides which of three CVs to send, tracks what I have already applied to, and exports to a spreadsheet — running itself at 08:00 every weekday.',
      },
      {
        src: 'img/pipeline_funnel.webp',
        alt: 'Funnel chart: 120,351 job records read, ~4,800 matched a search title, 476 survived the filters, 247 worth reviewing that day',
        caption:
          'The ratio is the point. Roughly 99.8% of what the sources return is wrong for me on location, seniority or role type — the value is in removing it reliably, not in finding more of it.',
      },
    ],
    stack: ['Node.js', 'Python', 'Selenium', 'REST APIs', 'HTML scraping', 'Scheduled jobs', 'Regression testing'],
  },
]

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
