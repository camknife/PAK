import type { FAQCategory } from "./faq-types"

const course: FAQCategory = {
  id: "course",
  label: "课程体系",
  description: "课程安排、内容大纲与教学方式",
  items: [
    {
      id: "course-structure",
      question: "PAK 认证培训课程的整体结构是怎样的？分几个模块？",
      answer: "课程遵循 DÄGAK（德国应用肌动学学会）标准，全系列共 6 大模块，合计 240 学时（含线上预习、线下实操、复训与作业）：\n\n- 每个模块 3 天面授，教学主题由 DÄGAK 认证讲师安排\n- 目前开放模块 1–2，模块 3–6 将陆续开设\n- 每期限额 24 人，保证实操指导质量\n- 课程面向医疗从业人员开放：全科、牙科、康复、物理治疗、功能医学等方向的临床工作者均可报名",
      keywords: ["课程结构", "培训安排", "模块", "6大模块", "240学时"],
      related: ["how-many-days", "certification-path", "hands-on-ratio"],
    },
    {
      id: "how-many-days",
      question: "整个 PAK 课程要学多久？培训是连续的还是分期的？",
      answer: "整个 PAK 认证课程体系共 6 大模块、240 学时，以线上预习 + 面授集训 + 复训与作业的方式完成：\n\n- 线上预习：报名后即赠送价值 5000 元的线上预习课程（共 7 小时），计入 240 学时\n- 面授：全系列 6 个模块，每个模块 3 天\n- 复训与作业：计入 240 学时\n\n模块 1–2 目前开放报名，模块 3–6 将陆续开设。学员按模块依次学习、持续进阶，不需要一次性学完全部模块。",
      keywords: ["学习时长", "240学时", "培训周期", "面授集训", "分期"],
      related: ["course-structure", "hands-on-ratio", "certification-path"],
    },
    {
      id: "hands-on-ratio",
      question: "课程的理论和实操比例是多少？是否有真实患者演示？",
      answer: "理论与实操比例约 40% : 60%，以动手能力培养为核心：\n\n- 每种肌肉测试技术均安排讲师演示、学员分组对练、讲师逐组纠错三个环节\n- 每日下午设临床模拟环节，由讲师邀请真实患者或志愿者进行完整 PAK 评估流程展示\n- 学员之间互相作为测试对象，积累至少 50+ 次真实手感经验\n- 进阶模块阶段包含学员自带案例的汇报与讲师点评\n\nDÄGAK 认证要求学员在课程结束后提交规定数量的临床案例报告，确保不仅学会了，而且能用出来。",
      keywords: ["实操比例", "动手练习", "患者演示", "临床模拟", "分组对练"],
      related: ["course-structure", "certification-path", "hands-on-ratio"],
    },
    {
      id: "teaching-language",
      question: "课程是中文授课吗？教材是中文的吗？",
      answer: "课程采用中文授课，确保学员无障碍理解所有技术细节：\n\n- 主讲讲师为中文母语，经 DÄGAK 认证\n- 教材为中文翻译版，关键术语同时标注英文/德文原文\n- 所有解剖术语均以中文讲解，辅以国际通用解剖图谱\n- 课程中涉及的国际认证考试内容，会特别标注英文术语以帮助学员后续的国际交流\n\nHans Garten 博士的权威教材《应用肌动学：临床诊断与治疗》已有中文译本，作为课程核心参考书。",
      keywords: ["中文授课", "中文教材", "中文翻译", "教学语言"],
      related: ["certification-path", "course-structure"],
    },
  ],
}

export default course
