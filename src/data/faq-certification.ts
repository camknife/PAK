import type { FAQCategory } from "./faq-types"

const certification: FAQCategory = {
  id: "certification",
  label: "认证路径",
  description: "如何获得 ICAK 国际认证？证书含金量如何？",
  items: [
    {
      id: "certification-path",
      question: "完成培训后能获得什么认证？ICAK 和 DAEGAK 认证有什么不同？",
      answer: "完整认证路径如下：\n\nDÄGAK 认证（德国应用肌动学学会）\n- 完成 PAK 认证课程体系（6 大模块，240 学时）\n- 提交规定数量的临床案例报告\n- 通过书面与实操考核\n- 获得 DÄGAK 颁发的应用肌动学从业者证书\n\nICAK 国际认证（国际应用肌动学学院）\n- ICAK 是全球最高级别的应用肌动学认证机构，总部位于美国\n- DÄGAK 是 ICAK 在德国的官方合作学会，课程体系与 ICAK 标准完全对接\n- 获得 DÄGAK 认证后，满足 ICAK 规定的额外学时和考核要求，即可申请 ICAK 国际认证\n- ICAK 认证在全球应用肌动学领域具有最高权威性\n\n简单理解：DÄGAK 是入行证，ICAK 是专家证。大部分学员先获得 DÄGAK 认证，在临床积累一定经验后再申请 ICAK 认证。",
      keywords: ["ICAK", "DAEGAK", "认证", "国际认证", "证书", "从业资格"],
      related: ["certification-value", "icak-chapter", "hours-requirement"],
    },
    {
      id: "certification-value",
      question: "PAK 认证证书在国内有认可度吗？对执业有什么帮助？",
      answer: "证书价值体现在以下几个层面：\n\n专业能力背书：ICAK / DAEGAK 是全球应用肌动学领域公认的权威认证，持有该证书意味着你的徒手肌肉测试技能和整合诊疗能力达到了国际标准。\n\n临床竞争力：在国内物理治疗、整脊、功能医学等领域的从业者中，PAK 认证持有者相对稀缺，差异化优势明显。许多学员反馈，掌握 PAK 后患者复诊率和满意度显著提升。\n\n继续教育学分：部分省份的医学继续教育体系认可国际专业培训学时。\n\n国际交流网络：认证获得者自动加入 ICAK 全球从业者网络，可参加 ICAK 年会和国际研讨会，与全球同行持续交流。",
      keywords: ["证书认可度", "职业发展", "含金量", "国内认可", "继续教育"],
      related: ["certification-path", "icak-chapter", "hands-on-ratio"],
    },
    {
      id: "icak-chapter",
      question: "健衡学园与 ICAK 是什么关系？是官方授权吗？",
      answer: "健衡学园是 ICAK 亚太地区官方合作机构，也是 DAEGAK 在中文世界的独家培训伙伴：\n\n- 课程内容、考核标准和师资资质均经 DAEGAK 审核批准\n- 培训全程遵循 ICAK 国际教学大纲\n- 学员的认证申请由 DAEGAK 直接审理和颁发\n- Hans Garten 博士作为 DAEGAK 创始人和 ICAK 资深讲师，直接参与课程体系设计\n\n你可以将健衡学园理解为中文世界的 DAEGAK 官方培训中心——课程质量与国际标准完全一致，同时消除了语言和地域障碍。",
      keywords: ["健衡学园", "ICAK授权", "官方合作", "DAEGAK", "亚太地区"],
      related: ["certification-path", "about-garten", "certification-value"],
    },
    {
      id: "hours-requirement",
      question: "ICAK 认证需要多少学时？考核难吗？",
      answer: "ICAK 认证的正式要求：\n\n- 240 学时经 ICAK 认证讲师授课的培训学时（PAK 认证课程体系 6 大模块满足此要求）\n- 笔试：覆盖解剖、生理、PAK 理论与诊断模型\n- 实操考核：在规定时间内完成特定肌肉的标准测试流程，并准确解读结果\n- 案例报告：提交若干份完整的 PAK 评估与治疗案例文档\n\n关于难度：根据往期学员反馈，只要认真完成课程中的实操练习和课后临床实践，考核的通过率在 90% 以上。最大的挑战不在考试本身，而在于将 PAK 思维真正融入日常临床工作。建议在完成课程体系后至少积累 3-6 个月的临床实践再参加 ICAK 认证考试。",
      keywords: ["学时要求", "ICAK考试", "考核难度", "通过率", "笔试", "实操考核"],
      related: ["certification-path", "hours-requirement", "hands-on-ratio"],
    },
  ],
}

export default certification
