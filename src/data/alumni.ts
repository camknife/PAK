export interface Alumni {
  id: string
  name: string
  englishName?: string
  title: string
  avatar: string
  bio: string
  specialties: string[]
  location: string
  graduationYear: number
  course: string
  workplace: string
  email?: string
  address?: string
  occupation: string
}

const alumniData: Alumni[] = [
  {
    id: "alumni-01",
    name: "代琴纯",
    title: "健康管理师",
    avatar: "",
    bio: "深圳曼姿碧姿健康咨询公司健康管理师，将 PAK 应用肌动学技术融入健康管理服务，为客户提供更全面的身体功能评估方案。",
    specialties: ["健康管理", "身体功能评估"],
    location: "深圳",
    graduationYear: 2025,
    course: "PAK Part I · 基础培训",
    workplace: "深圳曼姿碧姿健康咨询公司",
    occupation: "健康管理",
  },
  {
    id: "alumni-02",
    name: "郑慧娟",
    englishName: "HUI CHUAN, CHENG",
    title: "物理治疗师",
    avatar: "",
    bio: "上海优蓓健康中心物理治疗师，具备扎实的康复治疗背景。通过 PAK 课程学习，将徒手肌肉测试技术整合到物理治疗评估中，提升了诊断精准度。",
    specialties: ["物理治疗", "康复评估", "肌肉测试"],
    location: "上海",
    graduationYear: 2025,
    course: "PAK Part I · 基础培训",
    workplace: "上海优蓓健康中心",
    address: "上海市长宁区",
    occupation: "物理治疗师",
  },
  {
    id: "alumni-03",
    name: "张弘驰",
    title: "ACSM 认证培训师",
    avatar: "",
    bio: "天津凯旋健身 ACSM 认证培训师，将 PAK 的肌肉测试与运动评估理念结合，为健身客户提供更科学的运动处方和功能评估服务。",
    specialties: ["运动评估", "体能训练", "健身指导"],
    location: "天津",
    graduationYear: 2025,
    course: "PAK Part I · 基础培训",
    workplace: "天津凯旋健身",
    email: "815116487@qq.com",
    address: "天津市河西区",
    occupation: "ACSM 培训师",
  },
  {
    id: "alumni-04",
    name: "蔡盛",
    title: "康复治疗师",
    avatar: "",
    bio: "成都 LCAO 康复中心康复治疗师，专注于骨骼肌肉系统功能障碍的康复治疗。PAK 课程为其提供了从结构、化学、心理三维度排查问题的新思路。",
    specialties: ["康复治疗", "骨骼肌肉系统", "功能评估"],
    location: "成都",
    graduationYear: 2025,
    course: "PAK Part I · 基础培训",
    workplace: "LCAO 康复中心",
    email: "1581607285@qq.com",
    address: "四川省成都市成华区",
    occupation: "康复治疗师",
  },
  {
    id: "alumni-05",
    name: "周俊豪",
    title: "康复治疗师",
    avatar: "",
    bio: "鹤壁市人民医院康复治疗师，在公立医院从事康复工作。PAK 课程帮助他建立了更系统的功能评估体系，提升了临床诊疗效率。",
    specialties: ["康复治疗", "神经肌肉评估", "临床诊断"],
    location: "鹤壁",
    graduationYear: 2025,
    course: "PAK Part I · 基础培训",
    workplace: "鹤壁市人民医院",
    address: "河南省鹤壁市淇滨区",
    occupation: "康复治疗师",
  },
  {
    id: "alumni-06",
    name: "林仲岘",
    englishName: "VALERIAN LAM",
    title: "自然疗法医师",
    avatar: "",
    bio: "香港自然疗法医师，拥有丰富的自然疗法临床经验。PAK 课程为其整合东西方医学理念提供了桥梁，将徒手肌肉测试融入自然疗法诊疗体系。",
    specialties: ["自然疗法", "整体医学", "能量医学"],
    location: "香港",
    graduationYear: 2025,
    course: "PAK Part I · 基础培训",
    workplace: "自然疗法诊所",
    address: "香港观塘区",
    occupation: "自然疗法医师",
  },
]

export default alumniData
