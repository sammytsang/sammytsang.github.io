// Every fact here is sourced from Sam's own CV, existing site copy, and project
// write-ups. Nothing in this file is invented. If a fact was missing from the
// brief, it is marked TODO rather than guessed.

export const profile = {
  name: 'Sam Tsang',
  role: 'Medical Robotics and AI Engineer',
  qualification: 'MSc Medical Robotics and Artificial Intelligence, UCL',
  positioning:
    'I build physical systems — pneumatic, electrical, and learned — and I trust what I measure on the bench over what I assumed at the whiteboard.',
  location: 'London',
  availability: 'Available from September 2026',
  rightToWork: 'Full UK right to work · no sponsorship required',
  email: 'samtsangwork@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sam-tsang-65608529a',
  github: 'https://github.com/sammytsang',
  // Source repository for this site — update if you rename or fork it.
  siteSource: 'https://github.com/sammytsang/sammytsang.github.io',
  cvPath: 'cv/Sam_Tsang_CV.pdf',
  cvFilename: 'Sam_Tsang_CV.pdf',
}

export const highlights = [
  {
    title: 'MR-safe pneumatic actuator',
    body: 'Drives a surgical catheter on compressed air alone, with nothing electrically active anywhere near the MRI bore.',
  },
  {
    title: 'Webcam-controlled prosthetic hand',
    body: 'Vision-to-motor pipeline built end to end — selected for the department showcase and demoed live to the public.',
  },
  {
    title: 'Found the real bottleneck by measuring',
    body: "Instrumented a pneumatic circuit stage by stage and found 27% of the regulated supply lost at the valve stage — not the part everyone assumed.",
  },
]

export const approachPrinciples = [
  {
    title: 'A number nobody can defend is worse than no number.',
    body: "My thesis could have reported that the actuator turned. Instead it reports torque, speed, thrust and efficiency across the full pressure range, with the losses attributed to specific components. That took longer, and it's the only reason the results mean anything.",
  },
  {
    title: 'Find the real bottleneck, not the obvious one.',
    body: 'I assumed the rolling diaphragm would dominate the losses in my actuator. Systematic pressure mapping across every stage of the circuit showed it was actually the valve stage — 27% of the regulated supply gone there alone, a property of that valve type, not one faulty part. That measurement changed what the next revision had to fix.',
  },
  {
    title: 'Failure modes are the interesting result.',
    body: 'A surgical-phase classifier I built looked fine at a glance, but had completely failed on the one phase that matters clinically. The headline number hid it. Only purpose-built diagnostics exposed that the model had learned to predict a single class and nothing else.',
  },
  {
    title: 'Design for the failure that hurts someone.',
    body: 'In a wearable pneumatic assist, the dangerous fault isn’t "no assistance" — it’s "inflates and stays inflated" on a person who already has limited mobility. So the controller releases on lost signal, bad timing data, or an interlock trip. Fail-safe has a direction.',
  },
]

export const education = [
  {
    period: '2025 – 2026',
    title: 'MSc Medical Robotics and Artificial Intelligence',
    org: 'University College London',
    detail:
      'Robotic Systems Engineering · Medical Robotics & Devices · AI for Surgery · Surgical Data Science · ML in Medical Imaging · Robot Vision & Navigation',
  },
  {
    period: '2022 – 2025',
    title: 'BEng Biomedical Engineering',
    org: 'University of Reading',
    detail: 'Upper Second Class Honours (2:1) · prosthetics, soft robotics and gaze-interaction projects · department showcase finalist',
  },
  {
    period: 'Jul – Aug 2025',
    title: 'Research intern',
    org: 'CUHK-Shenzhen, Futian Biomedical Innovation R&D Centre',
    detail: 'Statistical modelling over a large health-assessment dataset · semantic screening tool for incubation candidates',
  },
]

export const skills = {
  Hardware: [
    'Pneumatics',
    'Arduino & embedded firmware',
    'MOSFET drive electronics',
    'EMG sensing',
    'Dynamixel servos',
    '3D printing',
    'Fusion 360',
    'Bench instrumentation',
    'Soldering',
  ],
  Software: ['Python', 'C++', 'MATLAB', 'R', 'SQL'],
  'ML & Vision': [
    'PyTorch',
    'OpenCV',
    'MediaPipe',
    'scikit-learn',
    'SentenceTransformers',
    'Logistic & multinomial regression',
  ],
  Tools: [
    'ROS 2',
    'SLAM',
    'Kinematics & dynamics',
    'Trajectory planning',
    'dplyr / ggplot2 / future.apply',
    'pytest',
    'Git',
  ],
}
