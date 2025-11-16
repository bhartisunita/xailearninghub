// Courses list (each item has an aws certification link in examLink)
const courses = [
  {
    level: "Foundational",
    title: "AWS Cloud Practitioner Essentials",
    desc: "Learn AWS fundamentals: core services, security, billing & basic architecture.",
    udemy: "https://www.udemy.com/course/aws-certified-cloud-practitioner-new/",
    exam: "CLF-C02",
    examLink: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    tagClass: "tag-foundational"
  },

  {
    level: "Associate",
    title: "AWS Solutions Architect - Associate",
    desc: "Design resilient, high-performing architectures on AWS (SAA-C03 prep).",
    udemy: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-hands-on/",
    exam: "SAA-C03",
    examLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    tagClass: "tag-associate"
  },

  {
    level: "Associate",
    title: "AWS Developer - Associate",
    desc: "Build and deploy applications on AWS; serverless, CI/CD, and SDK usage.",
    udemy: "https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/",
    exam: "DVA-C02",
    examLink: "https://aws.amazon.com/certification/certified-developer-associate/",
    tagClass: "tag-associate"
  },

  {
    level: "Associate",
    title: "AWS CloudOps / SysOps - Associate",
    desc: "Operations, monitoring, automation and provisioning (SOA-C03 / CloudOps).",
    udemy: "https://www.udemy.com/course/aws-certified-cloudops-associate/",
    exam: "SOA-C03",
    examLink: "https://aws.amazon.com/certification/certified-sysops-admin-associate/",
    tagClass: "tag-associate"
  },

  {
    level: "Associate",
    title: "AWS Machine Learning Engineer - Associate",
    desc: "ML workflows, SageMaker, modeling, deployment and operations.",
    udemy: "https://www.udemy.com/course/aws-certified-machine-learning-engineer-associate-mla-c01/",
    exam: "MLA-C01",
    examLink: "https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/",
    tagClass: "tag-associate"
  },

  {
    level: "Associate",
    title: "AWS Data Engineer - Associate",
    desc: "Data pipelines, Glue, Redshift, Athena; ETL and data modelling.",
    udemy: "https://www.udemy.com/course/aws-data-engineer/",
    exam: "DEA-C01",
    examLink: "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    tagClass: "tag-associate"
  },

  {
    level: "Professional",
    title: "AWS Solutions Architect - Professional",
    desc: "Advanced architecture, migrations, cost & performance optimization.",
    udemy: "#",
    exam: "SAP-C02",
    examLink: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    tagClass: "tag-professional"
  },

  {
    level: "Professional",
    title: "AWS DevOps Engineer - Professional",
    desc: "CI/CD, automation, observability, and scalable deployment strategies.",
    udemy: "https://www.udemy.com/course/aws-certified-devops-engineer-professional-hands-on/",
    exam: "DOP-C02",
    examLink: "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
    tagClass: "tag-professional"
  },

  {
    level: "Specialty",
    title: "AWS Advanced Networking - Specialty",
    desc: "Hybrid networking, routing, Direct Connect, security and automation.",
    udemy: "#",
    exam: "ANS-C01",
    examLink: "https://aws.amazon.com/certification/certified-advanced-networking-specialty/",
    tagClass: "tag-specialty"
  },

  {
    level: "Specialty",
    title: "AWS Security - Specialty",
    desc: "Identity, detection, encryption, compliance and secure architecture.",
    udemy: "#",
    exam: "SCS-C02",
    examLink: "https://aws.amazon.com/certification/certified-security-specialty/",
    tagClass: "tag-specialty"
  },

  {
    level: "Specialty",
    title: "AWS Machine Learning - Specialty",
    desc: "Advanced ML concepts and production ML best practices.",
    udemy: "#",
    exam: "MLS-C01",
    examLink: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
    tagClass: "tag-specialty"
  }
];

function makeCard(course) {
  const card = document.createElement("div");
  card.className = "card";

  // Tag (color coded)
  const tag = document.createElement("span");
  tag.className = `tag ${course.tagClass || "tag-associate"}`;
  tag.textContent = course.level;

  // Title
  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = course.title;

  // Description
  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = course.desc;

  // Actions Row (anchored at bottom)
  const actions = document.createElement("div");
  actions.className = "card-actions";

  // Udemy Button
  const udemyBtn = document.createElement("a");
  udemyBtn.href = course.udemy || "#";
  udemyBtn.target = "_blank";
  udemyBtn.rel = "noopener noreferrer";
  udemyBtn.className = "btn-udemy";
  udemyBtn.textContent = "Check on Udemy →";

  // Exam Code — clickable to AWS certification page
  const examSpan = document.createElement("span");
  examSpan.className = "muted";
  if (course.examLink) {
    const eLink = document.createElement("a");
    eLink.href = course.examLink;
    eLink.target = "_blank";
    eLink.rel = "noopener noreferrer";
    eLink.className = "exam-link";
    eLink.textContent = course.exam;
    examSpan.appendChild(eLink);
  } else {
    examSpan.textContent = course.exam || "";
  }

  actions.appendChild(udemyBtn);
  actions.appendChild(examSpan);

  // Assemble card
  card.appendChild(tag);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(actions);

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("coursesGrid");
  courses.forEach(c => grid.appendChild(makeCard(c)));
});
