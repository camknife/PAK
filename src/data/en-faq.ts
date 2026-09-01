import type { FAQCategory } from "./faq-types"

/**
 * 英文版 FAQ 数据（7 分类 / 22 条）
 *
 * 术语表与 en.ts / EnAboutPage（Hans 2026-08-24 批注定稿）对齐：
 * Applied Kinesiology / PAK / manual muscle testing / Touch for Health / Brain Gym /
 * Injury Recall Technique (IRT) / Emotional Stress Release (ESR)。
 * 认证口径：240 学时(6 模块) → PAK Clinical Competence；再加 60 学时(累计 300)
 * → ICAK International Teaching Diplomate。人名机构名一律不翻译。
 * 分类 ID 与条目 ID 与中文 faq-*.ts 完全一致，保证 related 交叉跳转可用。
 */

// ─── About PAK ─────────────────────────────────────────────────────────
const aboutEn: FAQCategory = {
  id: "about",
  label: "About PAK",
  description: "What is Applied Kinesiology? Who is it for?",
  items: [
    {
      id: "what-is-pak",
      question: "What is Applied Kinesiology (PAK)?",
      answer:
        "Professional Applied Kinesiology (PAK) is a comprehensive clinical assessment system that uses manual muscle testing as its core diagnostic tool. It was founded in 1964 by the American chiropractor Dr. George Goodheart. After more than 60 years of development, it has formed a holistic diagnostic and treatment framework covering three dimensions: structure (fascia, joints, neuromuscular), chemistry (nutrition, toxins, metabolism) and psychology (emotions, stress patterns).\n\nUnlike ordinary muscle strength assessment, PAK manual muscle testing does not measure strength. Through gentle isometric resistance, it evaluates the nervous system's motor control over a specific muscle — whether the muscle can \"lock\" under pressure reflects the integrity of the corresponding neural pathway. This allows practitioners to locate the source of dysfunction in a short time, rather than merely treating symptoms.",
      keywords: ["Applied Kinesiology", "PAK", "manual muscle testing", "holistic diagnosis", "George Goodheart"],
      related: ["who-for", "pak-vs-others", "muscle-testing"],
    },
    {
      id: "who-for",
      question: "Who is PAK suitable for? Can I learn it without a medical background?",
      answer:
        "PAK is designed for the following healthcare professionals:\n\n- Physiotherapists / rehabilitation therapists: integrate PAK into sports injury assessment and rehabilitation plans\n- Chiropractors / osteopaths: precisely locate problem segments through muscle testing before spinal correction\n- Naturopaths / functional medicine practitioners: use the chemical dimension to assess nutritional deficiency and toxin load\n- General practitioners / specialists: obtain functional diagnostic information beyond imaging examinations\n- Acupuncturists / TCM practitioners: cross-validate meridian theory with kinesiological neuromuscular assessment\n- Dentists: use muscle testing to assess temporomandibular joint (TMJ) and occlusal-related muscle imbalance, incorporating oral structure into overall functional diagnosis\n- Sports rehabilitation coaches / strength and conditioning trainers: optimize athletes' movement patterns and injury prevention\n\nFor those without a medical background: PAK involves fundamentals of anatomy, physiology and neurology, so starting completely from zero is quite difficult. We recommend mastering basic human anatomy first.",
      keywords: ["who can learn", "physiotherapist", "chiropractor", "dentist", "medical background", "healthcare professional"],
      related: ["what-is-pak", "course-structure"],
    },
    {
      id: "pak-vs-others",
      question: "What is the difference between Applied Kinesiology (PAK) and general or sports kinesiology?",
      answer:
        "This is the most common point of confusion. The three have completely different purposes:\n\n- General kinesiology: the biomechanical discipline that studies human movement; the basic theory of sports science\n- Sports kinesiology: applies kinesiological principles to sports training and injury prevention\n- Applied Kinesiology (PAK): a clinical assessment system that uses manual muscle testing as a diagnostic tool. By evaluating neuromuscular function, it finds the root of body imbalance and develops integrative intervention plans\n\nIn short: general kinesiology studies movement; PAK uses muscle testing to diagnose and treat. PAK's uniqueness lies in using muscle testing as a window into neural function, connecting the three dimensions of structure, chemistry and psychology.",
      keywords: ["kinesiology difference", "sports kinesiology", "Applied Kinesiology comparison"],
      related: ["what-is-pak", "three-dimensions"],
    },
    {
      id: "three-dimensions",
      question: "What does PAK's three-dimensional diagnosis mean? How do structure, chemistry and psychology relate?",
      answer:
        "PAK's core concept is that the human body is an indivisible whole — health problems are rarely caused by a single factor:\n\n1. Structural dimension — fascial adhesions, joint dysfunction, neuromuscular decompensation patterns. Manual muscle testing locates functionally weak muscle groups and traces back to the corresponding nerve segments, meridians or viscerosomatic reflex zones.\n\n2. Chemical dimension — nutritional deficiency, food sensitivity, toxin load, metabolic disorders. A test substance is placed in the patient's mouth or on the body surface, and changes in the muscle test result are observed (therapeutic challenge) to determine whether the substance acts as a stressor or a support for the body.\n\n3. Psychological dimension — the influence of emotional stress, traumatic memories and belief patterns on muscle tone and posture. IRT (Injury Recall Technique) and ESR (Emotional Stress Release) are used to identify and release deep psychosomatic patterns.\n\nThese three dimensions do not operate independently: for example, chronic low back pain (structural) may be aggravated by viscerosomatic reflexes caused by food allergies (chemical), while persistent pain may in turn solidify into anxiety and fear-avoidance behavior (psychological). PAK treatment plans address all three threads at once.",
      keywords: ["three dimensions", "structure chemistry psychology", "therapeutic challenge", "viscerosomatic reflex", "holistic medicine"],
      related: ["what-is-pak", "muscle-testing", "irt-esr"],
    },
  ],
}

// ─── Course System ──────────────────────────────────────────────────────
const courseEn: FAQCategory = {
  id: "course",
  label: "Course System",
  description: "Course structure, syllabus and teaching methods",
  items: [
    {
      id: "course-structure",
      question: "What is the overall structure of the PAK certification training? How many modules are there?",
      answer:
        "The course follows the DÄGAK (German Society of Applied Kinesiology) standard. The full series has 6 modules, totaling 240 hours (including online preparatory course, offline practice, retraining and assignments):\n\n- Each module is 3 days of face-to-face teaching, with the topic arranged by a DÄGAK certified instructor\n- Modules 1–2 are currently open; modules 3–6 will be opened progressively\n- Each cohort is limited to 24 students to ensure quality practical guidance\n- The course is open to medical practitioners: clinical workers in general practice, dentistry, rehabilitation, physical therapy, functional medicine, etc. can apply",
      keywords: ["course structure", "training arrangement", "modules", "6 modules", "240 hours"],
      related: ["how-many-days", "certification-path", "hands-on-ratio"],
    },
    {
      id: "how-many-days",
      question: "How long does the whole PAK course take? Is the training continuous or in stages?",
      answer:
        "The full PAK certification curriculum has 6 modules and 240 hours, completed through online preparatory course + face-to-face intensive training + retraining and assignments:\n\n- Online preparatory course: a 7-hour online course (worth ¥5,000) is provided after registration, counted toward the 240 hours\n- Face-to-face: all 6 modules, each lasting 3 days\n- Retraining and assignments: counted toward the 240 hours\n\nModules 1–2 are currently open for registration; modules 3–6 will be opened progressively. Students study module by module and advance continuously — you do not need to complete all modules at once.",
      keywords: ["course duration", "240 hours", "training cycle", "intensive training", "in stages"],
      related: ["course-structure", "hands-on-ratio", "certification-path"],
    },
    {
      id: "hands-on-ratio",
      question: "What is the ratio of theory to practice? Are there real patient demonstrations?",
      answer:
        "The ratio of theory to practice is about 40% : 60%, with hands-on skill development as the core:\n\n- For each muscle testing technique, there are three stages: instructor demonstration, group practice among students, and instructor correction group by group\n- Every afternoon includes clinical simulation, where the instructor invites real patients or volunteers for a complete PAK assessment demonstration\n- Students practice on each other as test subjects, accumulating at least 50+ real hands-on experiences\n- Advanced modules include student case presentations with instructor feedback\n\nDÄGAK certification requires students to submit a specified number of clinical case reports after the course, ensuring that you can not only learn, but also apply.",
      keywords: ["practice ratio", "hands-on practice", "patient demonstration", "clinical simulation", "group practice"],
      related: ["course-structure", "certification-path", "hands-on-ratio"],
    },
    {
      id: "teaching-language",
      question: "Are the courses taught in Chinese? Are the textbooks in Chinese?",
      answer:
        "The courses are taught in Chinese to ensure students understand every technical detail without barriers:\n\n- The lead instructor is a native Chinese speaker, certified by DÄGAK\n- Textbooks are Chinese translations, with key terms annotated with their original English/German\n- All anatomical terms are explained in Chinese, supplemented by internationally used anatomical atlases\n- Content related to international certification exams is specially annotated with English terminology to help students in future international communication\n\nDr. Hans Garten's authoritative textbook Applied Kinesiology: Clinical Diagnosis and Treatment has a Chinese translation and serves as the core reference book.",
      keywords: ["Chinese-taught", "Chinese textbook", "Chinese translation", "teaching language"],
      related: ["certification-path", "course-structure"],
    },
  ],
}

// ─── Certification Path ────────────────────────────────────────────────
const certificationEn: FAQCategory = {
  id: "certification",
  label: "Certification Path",
  description: "How to obtain ICAK international certification? How credible is the certificate?",
  items: [
    {
      id: "certification-path",
      question: "What certification do I receive after completing the training? What is the difference between ICAK and DÄGAK certification?",
      answer:
        "The complete certification path is as follows:\n\nPAK Clinical Competence certificate\n- Complete the PAK certification curriculum (6 modules, 240 hours)\n- Pass the written and practical examinations\n- Receive the PAK Clinical Competence certificate and be entitled to use the PAK practitioner title\n\nICAK International Teaching Diplomate qualification\n- ICAK is the world's highest-level Applied Kinesiology certification body, headquartered in the United States\n- DÄGAK is ICAK's official cooperating society in Germany; its curriculum is fully aligned with ICAK standards\n- After receiving the PAK Clinical Competence certificate, an additional 60 hours of education (300 hours in total) qualifies you to apply for the ICAK International Teaching Diplomate examination\n- The ICAK Teaching Diplomate holds the highest authority in the field of Applied Kinesiology worldwide\n\nIn simple terms: the PAK Clinical Competence certificate is the professional foundation, and the ICAK Teaching Diplomate is a higher-level expert qualification. Most students first obtain the PAK Clinical Competence certificate, accumulate clinical experience, and then apply for the ICAK Teaching Diplomate.",
      keywords: ["ICAK", "DÄGAK", "certification", "international certification", "certificate"],
      related: ["certification-value", "icak-chapter", "hours-requirement"],
    },
    {
      id: "certification-value",
      question: "Is the PAK certificate recognized in China? How does it help my practice?",
      answer:
        "The value of the certificate is reflected in several aspects:\n\nProfessional credential: ICAK / DÄGAK are recognized as authoritative certifications in the global field of Applied Kinesiology. Holding the certificate means your manual muscle testing skills and integrative diagnostic abilities meet international standards.\n\nClinical competitiveness: among practitioners in physiotherapy, chiropractic, functional medicine and related fields in China, certified PAK practitioners are relatively scarce, offering a clear differentiation advantage. Many students report significantly higher patient return rates and satisfaction after mastering PAK.\n\nContinuing education credits: some provincial medical continuing education systems recognize international professional training hours.\n\nInternational network: certified practitioners automatically join the ICAK global practitioner network and can attend ICAK annual conferences and international seminars to exchange ideas with global peers.",
      keywords: ["certificate recognition", "career development", "value", "China recognition", "continuing education"],
      related: ["certification-path", "icak-chapter", "hands-on-ratio"],
    },
    {
      id: "icak-chapter",
      question: "What is the relationship between Active and Balanced Physiotherapy Academy and ICAK? Is it officially authorized?",
      answer:
        "Active and Balanced Physiotherapy Academy is an official ICAK partner institution in the Asia-Pacific region and the exclusive DÄGAK training partner in the Chinese-speaking world:\n\n- Course content, assessment standards and instructor qualifications are all reviewed and approved by DÄGAK\n- Training follows the ICAK international teaching syllabus throughout\n- Students' certification applications are directly reviewed and issued by DÄGAK\n- Dr. Hans Garten, as the founder of DÄGAK and a senior ICAK instructor, directly participates in curriculum design\n\nYou can think of Active and Balanced Physiotherapy Academy as the official DÄGAK training center in the Chinese-speaking world — course quality is fully consistent with international standards, while removing language and geographical barriers.",
      keywords: ["Active and Balanced Physiotherapy Academy", "ICAK authorization", "official cooperation", "DÄGAK", "Asia-Pacific"],
      related: ["certification-path", "about-garten", "certification-value"],
    },
    {
      id: "hours-requirement",
      question: "How many hours are required for PAK certification? Is the examination difficult?",
      answer:
        "The official requirements for PAK certification:\n\n- PAK Clinical Competence certificate: complete 240 hours of training taught by certified instructors (the 6 modules of the PAK certification curriculum satisfy this requirement) and pass the written and practical examinations\n- ICAK Teaching Diplomate: after receiving the PAK Clinical Competence certificate, an additional 60 hours of education (300 hours in total) qualifies you to apply for the ICAK International Teaching Diplomate examination\n- Written exam: covers anatomy, physiology, PAK theory and diagnostic models\n- Practical exam: complete the standard testing procedure for specific muscles within a set time and accurately interpret the results\n\nRegarding difficulty: according to feedback from previous students, as long as you seriously complete the in-class practical exercises and post-course clinical practice, the pass rate is above 90%. The biggest challenge is not the exam itself, but truly integrating PAK thinking into daily clinical work. We recommend accumulating at least 3–6 months of clinical practice after completing the curriculum before taking the higher-level certification exam.",
      keywords: ["hours requirement", "ICAK exam", "difficulty", "pass rate", "written exam", "practical exam"],
      related: ["certification-path", "hours-requirement", "hands-on-ratio"],
    },
  ],
}

// ─── Clinical Techniques ────────────────────────────────────────────────
const clinicalEn: FAQCategory = {
  id: "clinical",
  label: "Clinical Techniques",
  description: "Core technique principles and clinical application scenarios",
  items: [
    {
      id: "muscle-testing",
      question: "What is the principle behind manual muscle testing? Why can it be used for diagnosis?",
      answer:
        "PAK manual muscle testing is based on a core neurophysiological principle: the nervous system's motor control over a muscle is a dynamic balance that can be challenged.\n\nDuring testing, the practitioner applies gentle isometric resistance and observes whether the muscle can \"lock\" — that is, maintain contraction without being overcome. When a certain sensory stimulus (such as contact with a suspected allergenic food, pressure on a specific reflex point, or recalling an emotional event) causes an originally strong muscle to unlock, it indicates that the stimulus temporarily interferes with the function of the related neural pathway.\n\nThe underlying mechanisms include: neuroplasticity (the nervous system continuously integrates input from various senses), gamma motor neuron loops (muscle spindle sensitivity modulated by the central nervous system), and central integration (CIS, a concept proposed by Goodheart).\n\nIt should be emphasized that PAK muscle testing does not test strength, but the quality of neural control. This distinction is the basis for understanding PAK's diagnostic logic.",
      keywords: ["muscle testing principle", "neurophysiology", "isometric contraction", "central integration", "muscle spindle"],
      related: ["muscle-testing-reliable", "irt-esr", "three-dimensions"],
    },
    {
      id: "muscle-testing-reliable",
      question: "Is manual muscle testing reliable? Is there scientific evidence?",
      answer:
        "The scientific basis of manual muscle testing (MMT) comes from research at multiple levels:\n\nReliability studies: multiple studies show good to excellent inter-rater and test-retest consistency among trained testers (ICC values ranging 0.63–0.98, depending on the specific protocol and level of training). This also explains why PAK certification training places extreme emphasis on standardizing the testing technique.\n\nValidity studies: studies have compared MMT results with objective indicators such as EMG and nerve conduction velocity, confirming that MMT can reliably reflect changes in neuromuscular function.\n\nClinical studies: clinical reports in fields such as low back pain, temporomandibular joint disorders and food sensitivity show positive results using PAK assessment to guide treatment. Relevant literature can be found in the ICAK official journal and on PubMed.\n\nWe should honestly point out that some of PAK's more refined diagnostic applications (such as nutritional assessment via therapeutic challenge) still require more large-sample research support. This is also why the course emphasizes its role as an auxiliary diagnostic tool rather than a replacement for routine examination.",
      keywords: ["scientific evidence", "reliability", "validity", "EMG", "research evidence"],
      related: ["muscle-testing", "pak-vs-others", "three-dimensions"],
    },
    {
      id: "irt-esr",
      question: "What are the IRT Injury Recall Technique and ESR Emotional Stress Release?",
      answer:
        "IRT (Injury Recall Technique) and ESR (Emotional Stress Release) are two core techniques in the PAK system for addressing psychosomatic associations:\n\nIRT Injury Recall Technique: based on the tissue memory hypothesis — even after an old injury has structurally healed, the nervous system may retain an inhibitory protective pattern over the injured area, leaving the local muscle chronically weakened. IRT locates residual neural inhibition from old injuries through a specific testing procedure, and uses techniques such as frontal bone pressure to reset the central motor control over that area. It is often used for recurrent old-injury sites or chronic pain with no identifiable cause.\n\nESR Emotional Stress Release: based on the neurovascular association between the frontal bone and the brain's limbic system (the emotional center). When a patient's muscle test reveals muscle unlocking related to a specific emotion, the practitioner gently palpates the frontal eminence, guiding the patient to focus on the emotional feeling without deliberately analyzing or suppressing it, for about 1–3 minutes until the muscle recovers its lock. This technique is widely used for anxiety, post-traumatic stress, and chronic pain aggravated by emotional stress.",
      keywords: ["IRT", "ESR", "injury recall", "emotional stress release", "old injury", "psychosomatic", "frontal bone"],
      related: ["muscle-testing", "three-dimensions", "chronic-pain"],
    },
    {
      id: "chronic-pain",
      question: "How effective is PAK for chronic pain? Which conditions is it suitable for?",
      answer:
        "PAK is particularly advantageous in the field of chronic pain, because it does not simply treat where it hurts, but systematically investigates the multidimensional imbalance behind the pain:\n\nSuitable conditions\n- Chronic low back pain / neck pain (especially recurrent cases with no obvious imaging abnormality)\n- Temporomandibular joint disorders (TMD)\n- Chronic tendinopathies such as frozen shoulder and tennis elbow\n- Fibromyalgia syndrome (FMS)\n- Musculoskeletal symptoms related to chronic fatigue syndrome (CFS)\n- Residual functional disorders after sports injuries\n\nPAK's pain management path: 1. Locate key functionally weak muscle groups through muscle testing; 2. Trace back to the corresponding nerve segments, meridians or visceral reflex zones; 3. Rule out chemical factors (nutrition, toxins); 4. Assess whether old injury memory (IRT) or emotional stress (ESR) is superimposed; 5. Develop an integrative correction plan (manual adjustment + nutritional support + neural reset).\n\nMany students report that PAK helped them solve numerous difficult cases where all examinations had been done but no problem could be identified.",
      keywords: ["chronic pain", "low back pain", "neck pain", "frozen shoulder", "TMJ", "fibromyalgia", "difficult cases"],
      related: ["irt-esr", "three-dimensions", "muscle-testing"],
    },
  ],
}

// ─── Registration & Consultation ───────────────────────────────────────
const registrationEn: FAQCategory = {
  id: "registration",
  label: "Registration & Consultation",
  description: "Fees, location and registration process",
  items: [
    {
      id: "fee",
      question: "How much does the PAK training cost? What does it include?",
      answer:
        "The course is registered by module, and prices follow the current enrollment brochure:\n\n- Modules 1–2 (two modules): ¥16,000\n- Single module: ¥8,000\n\nRegistration includes:\n- An online preparatory course worth ¥5,000 (7 hours in total)\n- A Chinese-translated muscle testing book\n\nThe fee covers: face-to-face tuition, course textbooks and handouts (including Chinese translation), practical consumables, and refreshments.\n\nReturning students receive a discount on retraining. For the latest price, please use the appointment form or contact a course consultant directly.",
      keywords: ["fee", "tuition", "price", "cost", "what's included"],
      related: ["location", "registration-process"],
    },
    {
      id: "location",
      question: "Where is the training held? Are there online courses?",
      answer:
        "Training is currently held as offline face-to-face sessions in first-tier cities in China (subject to the notice for each intake). The reasons for choosing offline teaching: manual muscle testing is a highly hands-on skill that requires the instructor's step-by-step guidance and practice between students to master the correct feel; the practical sessions require equipment such as treatment tables and testing tools; clinical simulation and patient demonstrations require an on-site environment.\n\nAbout online courses: after registration, you receive an online preparatory course worth ¥5,000 (7 hours in total), which helps students build their anatomy and theory foundation before the face-to-face session and is counted toward the 240-hour PAK certification curriculum. However, core hands-on technique training currently still requires offline attendance — this is a hard requirement of DÄGAK certification.",
      keywords: ["training location", "offline", "online course", "distance", "remote"],
      related: ["fee", "hands-on-ratio", "registration-process"],
    },
    {
      id: "registration-process",
      question: "What is the registration process? How do I make an appointment?",
      answer:
        "The registration process is as follows:\n\n1. Fill in the appointment consultation form on this page (name + phone + professional background + course of interest)\n2. A course consultant contacts you within 1 business day to understand your background and needs and provide personalized course advice\n3. After confirming your intention, pay a deposit to reserve your place\n4. After registration, the online preparatory course is activated, and you receive the complimentary book and preparatory materials\n5. Attend the face-to-face training on time\n\nEach cohort is limited to 24 students, on a first-come, first-served basis. We recommend making an appointment for consultation as early as possible to secure a seat.",
      keywords: ["registration process", "appointment", "how to register", "reserve a place", "deposit"],
      related: ["fee", "location"],
    },
  ],
}

// ─── Comparison & Selection ─────────────────────────────────────────────
const comparisonEn: FAQCategory = {
  id: "comparison",
  label: "Comparison & Selection",
  description: "PAK compared with other therapies and systems",
  items: [
    {
      id: "pak-vs-ak",
      question: "Is Applied Kinesiology (PAK) the same as Touch for Health?",
      answer:
        "They are related but serve completely different purposes:\n\n- Applied Kinesiology (PAK): a clinical diagnostic and treatment system for healthcare professionals. It requires systematic study of anatomy, physiology and pathology, uses manual muscle testing for functional diagnosis, and develops integrative treatment plans. Practitioners are expected to have a medical professional background.\n- Touch for Health: a self-help health method for the general public developed by Dr. John Thie based on simplified Applied Kinesiology principles. It is aimed at lay people and non-medical practitioners, focusing on daily health maintenance and stress management, and does not involve disease diagnosis.\n\nYou can think of it this way: Touch for Health is a simplified civilian version of PAK, while PAK is a complete clinical diagnostic and treatment tool. If you are a licensed healthcare professional, PAK certification training is the more suitable choice.",
      keywords: ["Touch for Health", "John Thie", "difference", "comparison", "simplified version"],
      related: ["what-is-pak", "who-for", "pak-vs-others"],
    },
    {
      id: "pak-vs-acupuncture",
      question: "What are the similarities and differences between PAK and acupuncture / TCM? Can they be combined?",
      answer:
        "PAK and acupuncture / TCM share deep connections, and each has its own uniqueness:\n\nCommon ground: both emphasize a holistic view and do not treat symptoms in isolation; both focus on function rather than only structure; PAK's muscle-meridian correspondence aligns closely with TCM meridian theory; Chapman reflex points overlap heavily with many TCM acupoints.\n\nComplementarity: PAK provides an operable, repeatable functional assessment tool (muscle testing) that can objectify some judgments in TCM syndrome differentiation; acupuncture practitioners can use PAK assessment to verify the accuracy of point selection — whether muscle function improves after needling; PAK's chemical/nutritional dimension adds a modern nutritional-science explanation to TCM's food-therapy concepts.\n\nIn practice: many acupuncturists, after learning PAK, use muscle testing to confirm efficacy before and after needling, and also use PAK to screen out chemical factors hidden behind syndromes. The two are by no means in competition, but mutually reinforcing.",
      keywords: ["acupuncture", "TCM", "meridian", "acupoint", "combined", "integrated medicine"],
      related: ["three-dimensions", "muscle-testing", "who-for"],
    },
    {
      id: "pak-vs-pt",
      question: "I am a physiotherapist. How is PAK different from conventional physiotherapy? Do I need to replace my current methods?",
      answer:
        "PAK is not a replacement for physiotherapy, but an upgrade module:\n\nThe strength of conventional physiotherapy: biomechanics-based assessment (ROM, MMT grading, special tests, etc.); standardized protocols for exercise therapy, manual therapy and physical modalities; abundant evidence-based medicine support and insurance reimbursement recognition.\n\nPAK's added value: conventional MMT grading tells you that a muscle's strength is grade 4; PAK tells you why the muscle cannot be grade 5 — is it neural inhibition? nutritional deficiency? visceral reflex? PAK provides screening tools beyond the biomechanical level (chemical and psychological dimensions), helping you determine whether a patient's low back pain is a local problem or a reflex caused by food allergy or an old-injury memory.\n\nIn fact, many physiotherapists already unconsciously use similar holistic thinking in clinical practice. PAK simply gives you a systematic toolset to execute it. You do not need to give up your current methods — PAK is a new layer of capability added on top of your physiotherapy skills.",
      keywords: ["physiotherapy", "PT", "rehabilitation", "difference", "supplement"],
      related: ["who-for", "what-is-pak", "three-dimensions", "chronic-pain"],
    },
  ],
}

// ─── Instructors & Institution ─────────────────────────────────────────
const instructorEn: FAQCategory = {
  id: "instructor",
  label: "Instructors & Institution",
  description: "Who teaches? Why can you trust us?",
  items: [
    {
      id: "about-garten",
      question: "Who is Dr. Hans Garten? Why is his course worth learning?",
      answer:
        "Dr. Med. Hans Garten is one of the most influential educators in the global field of Applied Kinesiology:\n\n- Medical doctor: received his doctorate in medicine in 1987, specializing in sports medicine and physical therapy\n- Senior ICAK instructor: became an ICAK (International College of Applied Kinesiology) certified instructor in 1992, with 30+ years of teaching experience\n- Founder of DÄGAK: founded DÄGAK (German Society of Applied Kinesiology) in 1996 and served as its first president, standardizing the PAK education system and promoting it worldwide\n- Author of an authoritative textbook: published the authoritative textbook Applied Kinesiology: Clinical Diagnosis and Treatment in 2015, translated into 9 languages, and now the standard reference book for global PAK training\n- Clinical practitioner: more than 35 years of front-line clinical experience\n\nHis teaching style combines rigorous scientific attitude with intuitive clinical insight, respecting evidence-based medicine standards while preserving a deep understanding of the holistic nature of Applied Kinesiology.",
      keywords: ["Hans Garten", "instructor", "founder", "DÄGAK", "ICAK", "authority", "Germany"],
      related: ["icak-chapter", "certification-path"],
    },
    {
      id: "daga-vs-icak",
      question: "What is the relationship between DÄGAK and ICAK? Why learn through DÄGAK?",
      answer:
        "ICAK (International College of Applied Kinesiology): founded in the United States in 1973, the world's highest academic and certification body for PAK, setting international training standards and certification requirements, and certifying PAK instructors and courses worldwide.\n\nDÄGAK (German Society of Applied Kinesiology): founded in 1996 by Dr. Hans Garten, the official ICAK cooperating society in Germany, responsible for promoting PAK training in German-speaking regions and the Chinese-speaking world. Its curriculum is fully aligned with ICAK standards and is known for Germany's characteristic rigor and standardization.\n\nChoosing Active and Balanced Physiotherapy Academy (DÄGAK Chinese courses) rather than going directly to the US to study with ICAK offers these advantages: Chinese-language teaching removes language barriers; cost and time are far lower than overseas training; the same ICAK standards and the same certification value; and content closer to the clinical characteristics and common cases of Asian populations.",
      keywords: ["DÄGAK", "ICAK relationship", "German society", "international college", "organization"],
      related: ["icak-chapter", "certification-path", "about-garten"],
    },
  ],
}

const enFaqData: FAQCategory[] = [
  aboutEn,
  courseEn,
  certificationEn,
  clinicalEn,
  registrationEn,
  comparisonEn,
  instructorEn,
]

export default enFaqData
