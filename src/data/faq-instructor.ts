import type { FAQCategory } from "./faq-types"

const instructor: FAQCategory = {
  id: "instructor",
  label: "讲师与机构",
  description: "谁来教？为什么值得信任？",
  items: [
    {
      id: "about-garten",
      question: "Hans Garten 博士是谁？为什么他的课程值得学习？",
      answer: "Dr. Med. Hans Garten 是全球应用肌动学领域最具影响力的教育者之一：\n\n- 医学博士：1987 年获医学博士学位，专攻运动医学与物理治疗\n- ICAK 资深讲师：1992 年成为 ICAK（国际应用肌动学学院）认证讲师，拥有 30+ 年教学经验\n- DÄGAK 创始人：1996 年创立 DÄGAK（德国应用肌动学学会），担任首任会长，将 PAK 教育体系标准化并推广至全球\n- 权威教材作者：2015 年出版权威教材《应用肌动学：临床诊断与治疗》，已翻译为 9 种语言，是全球 PAK 培训的标准参考书\n- 临床实践者：超过 35 年的临床一线经验\n\n他的教学风格以严谨的科学态度与直觉性的临床洞见相结合，既尊重循证医学标准，又保留应用肌动学对人体整体性的深刻理解。",
      keywords: ["Hans Garten", "讲师", "创始人", "DÄGAK", "ICAK", "权威", "德国"],
      related: ["icak-chapter", "certification-path"],
    },
    {
      id: "daga-vs-icak",
      question: "DÄGAK 和 ICAK 是什么关系？为什么要通过 DÄGAK 学习？",
      answer: "ICAK（国际应用肌动学学院）：1973 年在美国成立，是 PAK 的全球最高学术与认证机构，制定 PAK 的国际培训标准和认证要求，认证全球的 PAK 讲师和课程。\n\nDÄGAK（德国应用肌动学学会）：1996 年由 Hans Garten 博士创立，是 ICAK 在德国的官方合作学会，负责德语区和中文世界的 PAK 培训推广，课程体系与 ICAK 标准完全对接，以德国特有的严谨和标准化著称。\n\n选择健衡学园（DÄGAK 中文课程）而非直接去美国学 ICAK，优势在于：中文授课消除语言障碍；费用和时间成本远低于海外培训；同样的 ICAK 标准、同样的认证价值；更贴近亚洲人群的临床特征和常见病例。",
      keywords: ["DÄGAK", "ICAK关系", "德国学会", "国际学院", "组织架构"],
      related: ["icak-chapter", "certification-path", "about-garten"],
    },
  ],
}

export default instructor
