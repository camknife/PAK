const footerCols = [
  {
    title: "关于",
    links: [
      { label: "健衡学园简介", href: "http://www.jianhengkf.com/lists/50.html" },
      // { label: "PAK 联盟（治疗师目录）", href: "/pak-union" }, // 治疗师目录模块暂缓
    ],
  },
  {
    title: "资源",
    links: [
      { label: "FAQ 问答", href: "/faq" },
      { label: "临床研究文献", href: "/research" },
      { label: "课程咨询", href: "/contact" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1A] pt-12 pb-6">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_2fr_2fr_2fr] gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-['Noto_Serif_SC',serif] text-base font-semibold text-[#F5F5F0] mb-3">
              PAK · 健衡学园
            </p>
            <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed max-w-[280px]">
              ICAK 亚太地区官方合作伙伴，提供德国 DÄGAK 认证的应用肌动学培训课程。
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col items-center gap-1.5">
                <img src="/assets/微信公众号.png" alt="微信公众号" className="h-20 w-auto rounded-sm" />
                <span className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#6B6B62]">微信公众号</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <img src="/assets/渠道活码-AK官网-推广码.jpg" alt="PAK官网推广码" className="h-20 w-auto rounded-sm" />
                <span className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#6B6B62]">PAK官网推广码</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.12em] uppercase text-[#9B9B90] mb-4">
              联系方式
            </p>
            <ul className="flex flex-col gap-2 font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62]">
              <li>
                <span className="block text-[#9B9B90] mb-1">电话</span>
                <a href="tel:037158532216" className="hover:text-[#9B9B90] transition-colors duration-200">
                  0371-58532216
                </a>
              </li>
              <li>
                <span className="block text-[#9B9B90] mb-1">邮箱</span>
                <a
                  href="mailto:hejukangfu@yeah.net"
                  className="hover:text-[#9B9B90] transition-colors duration-200 break-all"
                >
                  hejukangfu@yeah.net
                </a>
              </li>
              <li>
                <span className="block text-[#9B9B90] mb-1">地址</span>
                <span>河南省郑州市</span>
              </li>
            </ul>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.12em] uppercase text-[#9B9B90] mb-4">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] hover:text-[#9B9B90] transition-colors duration-200"
                    >{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#333330] pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#4A4A45]">
            © 2026 PAK（应用肌动学） 健衡学园. 保留所有权利。
          </p>
          <div className="flex gap-5">
            {["隐私政策", "使用条款", "联系我们"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#4A4A45] hover:text-[#6B6B62] transition-colors duration-200"
              >{l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
