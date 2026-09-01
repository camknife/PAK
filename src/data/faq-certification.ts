import type { FAQCategory } from "./faq-types"

const certification: FAQCategory = {
  id: "certification",
  label: "认证路径",
  description: "如何获得 ICAK 国际认证？证书含金量如何？",
  items: [
    {
      id: "certification-path",
      question: "完成培训后能获得什么认证？ICAK 和 DÄGAK 认证有什么不同？",
      answer: "完整认证路径如下：\n\nPAK 临床能力证书（PAK Clinical Competence）\n- 完成 PAK 认证课程体系（6 大模块，240 学时）\n- 通过笔试与实操考核\n- 获得 PAK 临床能力证书，可正式使用 PAK 从业者头衔\n\nICAK 国际教学 Diplomate 资格\n- ICAK 是全球最高级别的应用肌动学认证机构，总部位于美国\n- DÄGAK 是 ICAK 在德国的官方合作学会，课程体系与 ICAK 标准完全对接\n- 获得 PAK 临床能力证书后，再加修 60 学时教育（累计 300 学时），可报考 ICAK 国际教学 Diplomate 考试\n- ICAK 教学 Diplomate 在全球应用肌动学领域具有最高权威性\n\n简单理解：PAK 临床能力证书是从业基础，ICAK 教学 Diplomate 是更高阶的专家资质。大部分学员先获得 PAK 临床能力证书，在临床积累一定经验后再报考 ICAK 教学 Diplomate。",
      keywords: ["ICAK", "DÄGAK", "认证", "国际认证", "证书", "从业资格"],
      related: ["certification-value", "icak-chapter", "hours-requirement"],
    },
    {
      id: "certification-value",
      question: "PAK 认证证书在国内有认可度吗？对执业有什么帮助？",
      answer: "证书价值体现在以下几个层面：\n\n专业能力背书：ICAK / DÄGAK 是全球应用肌动学领域公认的权威认证，持有该证书意味着你的徒手肌肉测试技能和整合诊疗能力达到了国际标准。\n\n临床竞争力：在国内物理治疗、整脊、功能医学等领域的从业者中，PAK 认证持有者相对稀缺，差异化优势明显。许多学员反馈，掌握 PAK 后患者复诊率和满意度显著提升。\n\n继续教育学分：部分省份的医学继续教育体系认可国际专业培训学时。\n\n国际交流网络：认证获得者自动加入 ICAK 全球从业者网络，可参加 ICAK 年会和国际研讨会，与全球同行持续交流。",
      keywords: ["证书认可度", "职业发展", "含金量", "国内认可", "继续教育"],
      related: ["certification-path", "icak-chapter", "hands-on-ratio"],
    },
    {
      id: "icak-chapter",
      question: "健衡学园与 ICAK 是什么关系？是官方授权吗？",
      answer: "健衡学园是 ICAK 亚太地区官方合作机构，也是 DÄGAK 在中文世界的独家培训伙伴：\n\n- 课程内容、考核标准和师资资质均经 DÄGAK 审核批准\n- 培训全程遵循 ICAK 国际教学大纲\n- 学员的认证申请由 DÄGAK 直接审理和颁发\n- Hans Garten 博士作为 DÄGAK 创始人和 ICAK 资深讲师，直接参与课程体系设计\n\n你可以将健衡学园理解为中文世界的 DÄGAK 官方培训中心——课程质量与国际标准完全一致，同时消除了语言和地域障碍。",
      keywords: ["健衡学园", "ICAK授权", "官方合作", "DÄGAK", "亚太地区"],
      related: ["certification-path", "about-garten", "certification-value"],
    },
    {
      id: "hours-requirement",
      question: "PAK 认证需要多少学时？考核难吗？",
      answer: "PAK 认证的正式要求：\n\n- PAK 临床能力证书：完成 240 学时经认证讲师授课的培训学时（PAK 认证课程体系 6 大模块满足此要求），通过笔试与实操考核\n- ICAK 教学 Diplomate：获得 PAK 临床能力证书后，再加修 60 学时（累计 300 学时），可报考 ICAK 国际教学 Diplomate 考试\n- 笔试：覆盖解剖、生理、PAK 理论与诊断模型\n- 实操考核：在规定时间内完成特定肌肉的标准测试流程，并准确解读结果\n\n关于难度：根据往期学员反馈，只要认真完成课程中的实操练习和课后临床实践，考核的通过率在 90% 以上。最大的挑战不在考试本身，而在于将 PAK 思维真正融入日常临床工作。建议在完成课程体系后至少积累 3-6 个月的临床实践，再参加更高阶的认证考试。",
      keywords: ["学时要求", "ICAK考试", "考核难度", "通过率", "笔试", "实操考核"],
      related: ["certification-path", "hours-requirement", "hands-on-ratio"],
    },
  ],
}

export default certification
