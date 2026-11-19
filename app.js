(function () {
  "use strict";

  const STORAGE_KEY = "yanyan_gacha_state_v2";
  const BASE_COINS = 5;

  // 9 样线上购物礼品券 + 1 张集满解锁的心愿券（精致 120x120 软萌手绘插画）
  const PRIZE_POOL = [
    {
      id: "milk-tea",
      title: "奶茶一杯",
      rarity: "甜品",
      rarityClass: "tag-sweet",
      desc: "想喝哪家，点给你",
      capsuleTop: "#FFB5C5",
      mark: "♡",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#FFF0F4"/>
          <path d="M22 38 L24 42 L28 44 L24 46 L22 50 L20 46 L16 44 L20 42 Z" fill="#FFE082"/>
          <path d="M96 30 C94 27, 89 28, 90 32 C91 35, 96 38, 96 38 C96 38, 101 35, 102 32 C103 28, 98 27, 96 30 Z" fill="#FF8FA3"/>
          <!-- 弯吸管 -->
          <path d="M68 18 L77 14 C80 13, 82 16, 80 19 L69 38" stroke="#FF8FA3" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M68 18 L77 14 C80 13, 82 16, 80 19 L69 38" stroke="#5C4033" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- 杯身 -->
          <path d="M35 42 H85 L77 98 C76.4 102 73 105 69 105 H51 C47 105 43.6 102 43 98 L35 42 Z" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <!-- 奶茶液体 -->
          <path d="M38 56 H82 L77 98 C76.4 102 73 105 69 105 H51 C47 105 43.6 102 43 98 L38 56 Z" fill="#F6C28B"/>
          <!-- 奶盖滴落 -->
          <path d="M36 44 H84 L82 58 C78 62, 74 55, 69 60 C64 65, 58 55, 52 60 C46 65, 42 56, 38 60 Z" fill="#FFF7EE" stroke="#5C4033" stroke-width="2.8" stroke-linejoin="round"/>
          <!-- 透明穹顶盖与粉边 -->
          <path d="M38 42 C38 25, 82 25, 82 42 Z" fill="#FFFFFF" fill-opacity="0.72" stroke="#5C4033" stroke-width="3.2"/>
          <rect x="31" y="37" width="58" height="9" rx="4.5" fill="#FF9EBB" stroke="#5C4033" stroke-width="3.2"/>
          <!-- 底部珍珠 -->
          <circle cx="49" cy="96" r="4.5" fill="#5C4033"/>
          <circle cx="60" cy="98" r="4.8" fill="#5C4033"/>
          <circle cx="71" cy="95" r="4.5" fill="#5C4033"/>
          <circle cx="54" cy="88" r="4" fill="#6D4C41"/>
          <circle cx="66" cy="87" r="4" fill="#6D4C41"/>
          <!-- 软萌小表情 -->
          <circle cx="51" cy="73" r="2.6" fill="#5C4033"/>
          <circle cx="69" cy="73" r="2.6" fill="#5C4033"/>
          <ellipse cx="46" cy="77" rx="4" ry="2.2" fill="#FF8FA3" opacity="0.75"/>
          <ellipse cx="74" cy="77" rx="4" ry="2.2" fill="#FF8FA3" opacity="0.75"/>
          <path d="M56 76 Q60 80 64 76" stroke="#5C4033" stroke-width="2.6" stroke-linecap="round"/>
          <!-- 杯身高光 -->
          <path d="M44 50 L47 80" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
        </svg>`
    },
    {
      id: "dessert",
      title: "小蛋糕一份",
      rarity: "甜品",
      rarityClass: "tag-sweet",
      desc: "挑个爱吃的甜品",
      capsuleTop: "#FFD1DC",
      mark: "✿",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#FFF5F7"/>
          <circle cx="24" cy="36" r="3.5" fill="#FFE082"/>
          <circle cx="98" cy="44" r="3" fill="#FF9EBB"/>
          <!-- 蕾丝小瓷盘 -->
          <ellipse cx="60" cy="97" rx="44" ry="10" fill="#FFE89E" stroke="#5C4033" stroke-width="3.4"/>
          <ellipse cx="60" cy="95" rx="34" ry="6" fill="#FFFDF9"/>
          <!-- 下层蛋糕胚 -->
          <rect x="25" y="64" width="70" height="30" rx="10" fill="#FFE5B4" stroke="#5C4033" stroke-width="3.5"/>
          <!-- 夹心果酱层 -->
          <path d="M26 79 H94" stroke="#FF8FA3" stroke-width="6"/>
          <path d="M26 79 H94" stroke="#5C4033" stroke-width="2" stroke-dasharray="4 4" opacity="0.35"/>
          <!-- 上层奶油淋面 -->
          <path d="M25 68 C25 56, 95 56, 95 68 V73 C89 79, 82 69, 75 75 C68 81, 60 69, 52 75 C44 81, 37 70, 30 75 C27 77, 25 74, 25 72 Z" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.2" stroke-linejoin="round"/>
          <!-- 顶部小奶油球 -->
          <circle cx="42" cy="56" r="8" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.8"/>
          <circle cx="78" cy="56" r="8" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.8"/>
          <!-- 大草莓 -->
          <path d="M48 53 C46 37, 54 27, 60 27 C66 27, 74 37, 72 53 C71 58, 49 58, 48 53 Z" fill="#FF5C7A" stroke="#5C4033" stroke-width="3.3"/>
          <!-- 草莓绿叶 -->
          <path d="M60 28 L51 22 L56 30 L60 24 L64 30 L69 22 Z" fill="#74C69D" stroke="#5C4033" stroke-width="2.4" stroke-linejoin="round"/>
          <!-- 草莓籽与高光 -->
          <circle cx="56" cy="40" r="1.5" fill="#FFE89E"/>
          <circle cx="64" cy="42" r="1.5" fill="#FFE89E"/>
          <circle cx="59" cy="48" r="1.5" fill="#FFE89E"/>
          <path d="M53 38 C52 42, 53 46, 54 47" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
          <!-- 蛋糕萌表情 -->
          <circle cx="50" cy="87" r="2.3" fill="#5C4033"/>
          <circle cx="70" cy="87" r="2.3" fill="#5C4033"/>
          <path d="M57 88 Q60 91 63 88" stroke="#5C4033" stroke-width="2.4" stroke-linecap="round"/>
        </svg>`
    },
    {
      id: "kfc",
      title: "肯德基一顿",
      rarity: "美食",
      rarityClass: "tag-sweet",
      desc: "想吃炸鸡随时点",
      capsuleTop: "#FFCAA6",
      mark: "✦",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#FFF4E6"/>
          <path d="M22 34 L24 38 L28 40 L24 42 L22 46 L20 42 L16 40 L20 38 Z" fill="#FFB703"/>
          <!-- 金黄薯条 -->
          <rect x="64" y="22" width="8" height="32" rx="3" transform="rotate(10 64 22)" fill="#FFD166" stroke="#5C4033" stroke-width="2.8"/>
          <rect x="74" y="25" width="8" height="30" rx="3" transform="rotate(18 74 25)" fill="#FFE28A" stroke="#5C4033" stroke-width="2.8"/>
          <!-- 酥脆大鸡腿 -->
          <path d="M36 52 C28 40, 34 24, 48 25 C58 26, 65 36, 61 52 Z" fill="#F4A261" stroke="#5C4033" stroke-width="3.4" stroke-linejoin="round"/>
          <path d="M40 35 C42 31, 47 30, 50 32" stroke="#FFE5B4" stroke-width="3" stroke-linecap="round"/>
          <!-- 小鸡翅 -->
          <path d="M55 52 C54 38, 66 32, 75 40 C80 44, 80 50, 76 54 Z" fill="#E7934D" stroke="#5C4033" stroke-width="3.2"/>
          <!-- 红白条纹炸鸡桶 -->
          <path d="M29 50 H91 L83 98 C82.2 102 79 105 74.5 105 H45.5 C41 105 37.8 102 37 98 L29 50 Z" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <path d="M40 50 L44 105 M60 50 V105 M80 50 L76 105" stroke="#FF6B81" stroke-width="11"/>
          <path d="M29 50 H91 L83 98 C82.2 102 79 105 74.5 105 H45.5 C41 105 37.8 102 37 98 L29 50 Z" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <!-- 桶口红边 -->
          <rect x="25" y="45" width="70" height="10" rx="5" fill="#FF6B81" stroke="#5C4033" stroke-width="3.3"/>
          <!-- 桶身萌系圆标 -->
          <circle cx="60" cy="78" r="14" fill="#FFFDF9" stroke="#5C4033" stroke-width="3"/>
          <circle cx="55" cy="76" r="2.2" fill="#5C4033"/>
          <circle cx="65" cy="76" r="2.2" fill="#5C4033"/>
          <path d="M56 81 Q60 85 64 81" stroke="#5C4033" stroke-width="2.4" stroke-linecap="round"/>
        </svg>`
    },
    {
      id: "snacks",
      title: "零食大礼包",
      rarity: "零食",
      rarityClass: "tag-warm",
      desc: "挑一箱爱吃的寄给你",
      capsuleTop: "#FFE28A",
      mark: "★",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#FFF7DF"/>
          <!-- 冒出来的薯片袋 -->
          <rect x="26" y="24" width="26" height="36" rx="5" transform="rotate(-12 26 24)" fill="#FFD166" stroke="#5C4033" stroke-width="3.2"/>
          <circle cx="42" cy="40" r="6" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.2"/>
          <!-- 冒出来的粉色饼干棒 -->
          <rect x="66" y="20" width="24" height="38" rx="5" transform="rotate(11 66 20)" fill="#FF9EBB" stroke="#5C4033" stroke-width="3.2"/>
          <path d="M72 32 H84 M70 40 H82" stroke="#FFFDF9" stroke-width="3" stroke-linecap="round"/>
          <!-- 糖果 -->
          <circle cx="58" cy="34" r="9" fill="#BCEAD5" stroke="#5C4033" stroke-width="3"/>
          <!-- 礼盒箱体 -->
          <rect x="22" y="48" width="76" height="54" rx="12" fill="#FFD8BE" stroke="#5C4033" stroke-width="3.6"/>
          <rect x="18" y="42" width="84" height="14" rx="6" fill="#FF9EBB" stroke="#5C4033" stroke-width="3.4"/>
          <!-- 蝴蝶结丝带 -->
          <rect x="53" y="42" width="14" height="60" fill="#FFE89E" stroke="#5C4033" stroke-width="3"/>
          <path d="M60 44 C48 28, 34 36, 44 45 Z" fill="#FFE89E" stroke="#5C4033" stroke-width="3" stroke-linejoin="round"/>
          <path d="M60 44 C72 28, 86 36, 76 45 Z" fill="#FFE89E" stroke="#5C4033" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="60" cy="44" r="5" fill="#FF8FA3" stroke="#5C4033" stroke-width="2.6"/>
          <!-- 小爱心贴纸 -->
          <path d="M37 74 C35 71, 31 72, 32 76 C33 79, 37 82, 37 82 C37 82, 41 79, 42 76 C43 72, 39 71, 37 74 Z" fill="#FF8FA3"/>
          <path d="M83 74 C81 71, 77 72, 78 76 C79 79, 83 82, 83 82 C83 82, 87 79, 88 76 C89 72, 85 71, 83 74 Z" fill="#FF8FA3"/>
        </svg>`
    },
    {
      id: "pajamas",
      title: "睡衣一套",
      rarity: "礼物",
      rarityClass: "tag-warm",
      desc: "挑套软乎乎的，我买单",
      capsuleTop: "#D9C4FF",
      mark: "☾",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#F5EEFF"/>
          <!-- 弯弯小月亮与星星 -->
          <path d="M90 22 C84 24, 83 32, 90 34 C83 35, 79 29, 82 23 C84 20, 87 20, 90 22 Z" fill="#FFE082" stroke="#5C4033" stroke-width="2"/>
          <circle cx="24" cy="30" r="3" fill="#FF9EBB"/>
          <!-- 软萌睡衣主体 -->
          <path d="M38 28 L18 46 L29 59 L37 52 V96 C37 100 40 102 44 102 H76 C80 102 83 100 83 96 V52 L91 59 L102 46 L82 28 L69 34 C64 37, 56 37, 51 34 L38 28 Z" fill="#FFD6E0" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <!-- 娃娃翻领 -->
          <path d="M40 29 C42 42, 54 45, 60 39 C66 45, 78 42, 80 29" fill="#FFFDF9" stroke="#5C4033" stroke-width="3" stroke-linejoin="round"/>
          <!-- 领口小蝴蝶结 -->
          <path d="M60 41 L51 36 V46 Z M60 41 L69 36 V46 Z" fill="#FF8FA3" stroke="#5C4033" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="60" cy="41" r="3" fill="#FFE89E" stroke="#5C4033" stroke-width="2"/>
          <!-- 门襟与扣子 -->
          <line x1="60" y1="45" x2="60" y2="102" stroke="#5C4033" stroke-width="2.5" stroke-dasharray="4 4"/>
          <circle cx="53" cy="59" r="3" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.2"/>
          <circle cx="53" cy="74" r="3" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.2"/>
          <circle cx="53" cy="89" r="3" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.2"/>
          <!-- 小熊口袋 -->
          <rect x="66" y="64" width="13" height="14" rx="4" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.6"/>
          <path d="M72.5 69 C71 67, 68.5 68, 69 70.5 C69.5 72.5, 72.5 74.5, 72.5 74.5 C72.5 74.5, 75.5 72.5, 76 70.5 C76.5 68, 74 67, 72.5 69 Z" fill="#FF8FA3"/>
        </svg>`
    },
    {
      id: "slippers",
      title: "居家拖鞋一双",
      rarity: "礼物",
      rarityClass: "tag-warm",
      desc: "选双舒服的寄过去",
      capsuleTop: "#BCEAD5",
      mark: "✿",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#EEFAF4"/>
          <!-- 左脚毛绒拖鞋 -->
          <g transform="rotate(-10 42 64)">
            <ellipse cx="42" cy="66" rx="19" ry="33" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.5"/>
            <ellipse cx="42" cy="68" rx="13" ry="25" fill="#FFF0F3"/>
            <!-- 小熊耳朵 -->
            <circle cx="31" cy="43" r="6" fill="#F3D5B5" stroke="#5C4033" stroke-width="2.8"/>
            <circle cx="53" cy="43" r="6" fill="#F3D5B5" stroke="#5C4033" stroke-width="2.8"/>
            <!-- 毛绒鞋面 -->
            <path d="M23 56 C27 41, 57 41, 61 56 C55 68, 29 68, 23 56 Z" fill="#FFCAD4" stroke="#5C4033" stroke-width="3.3"/>
            <circle cx="36" cy="54" r="2.2" fill="#5C4033"/>
            <circle cx="48" cy="54" r="2.2" fill="#5C4033"/>
            <path d="M40 58 Q42 60 44 58" stroke="#5C4033" stroke-width="2.2" stroke-linecap="round"/>
          </g>
          <!-- 右脚毛绒拖鞋 -->
          <g transform="rotate(10 78 68)">
            <ellipse cx="78" cy="70" rx="19" ry="32" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.5"/>
            <ellipse cx="78" cy="72" rx="13" ry="24" fill="#FFF7DF"/>
            <circle cx="67" cy="47" r="6" fill="#F3D5B5" stroke="#5C4033" stroke-width="2.8"/>
            <circle cx="89" cy="47" r="6" fill="#F3D5B5" stroke="#5C4033" stroke-width="2.8"/>
            <path d="M59 60 C63 45, 93 45, 97 60 C91 72, 65 72, 59 60 Z" fill="#FFE89E" stroke="#5C4033" stroke-width="3.3"/>
            <circle cx="72" cy="58" r="2.2" fill="#5C4033"/>
            <circle cx="84" cy="58" r="2.2" fill="#5C4033"/>
            <path d="M76 62 Q78 64 80 62" stroke="#5C4033" stroke-width="2.2" stroke-linecap="round"/>
          </g>
          <path d="M58 24 L60 28 L64 30 L60 32 L58 36 L56 32 L52 30 L56 28 Z" fill="#FF8FA3"/>
        </svg>`
    },
    {
      id: "thermos",
      title: "暖水壶一个",
      rarity: "礼物",
      rarityClass: "tag-warm",
      desc: "挑个好看的，多喝热水",
      capsuleTop: "#B8E1FF",
      mark: "♡",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#EEF7FF"/>
          <!-- 暖暖蒸汽与小爱心 -->
          <path d="M47 20 C44 15, 49 11, 47 7" stroke="#FF9EBB" stroke-width="3" stroke-linecap="round"/>
          <path d="M60 18 C57 13, 62 9, 60 5" stroke="#FFE082" stroke-width="3" stroke-linecap="round"/>
          <path d="M73 20 C70 15, 75 11, 73 7" stroke="#FF9EBB" stroke-width="3" stroke-linecap="round"/>
          <!-- 提手 -->
          <path d="M78 48 C94 48, 94 74, 78 74" stroke="#5C4033" stroke-width="5" stroke-linecap="round"/>
          <path d="M78 48 C91 48, 91 74, 78 74" stroke="#FFE89E" stroke-width="2.2" stroke-linecap="round"/>
          <!-- 壶盖 -->
          <rect x="44" y="25" width="32" height="14" rx="6" fill="#FFE89E" stroke="#5C4033" stroke-width="3.4"/>
          <rect x="38" y="36" width="44" height="9" rx="4.5" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.2"/>
          <!-- 大肚壶身 -->
          <path d="M36 45 H84 L86 84 C86 96 78 103 66 103 H54 C42 103 34 96 34 84 L36 45 Z" fill="#FFCAD4" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <!-- 底部保护套 -->
          <path d="M35 86 H85 C84 96 77 103 66 103 H54 C43 103 36 96 35 86 Z" fill="#FFE89E" stroke="#5C4033" stroke-width="3.2"/>
          <!-- 中央奶油爱心贴纸 -->
          <circle cx="60" cy="66" r="15" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.8"/>
          <path d="M60 62 C57 57, 50 59, 51 65 C52 70, 60 75, 60 75 C60 75, 68 70, 69 65 C70 59, 63 57, 60 62 Z" fill="#FF8FA3" stroke="#5C4033" stroke-width="2.2"/>
          <!-- 高光 -->
          <path d="M43 52 L42 78" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.72"/>
        </svg>`
    },
    {
      id: "charm",
      title: "可爱小挂件",
      rarity: "彩蛋",
      rarityClass: "tag-bonus",
      desc: "挑一个你喜欢的挂件",
      capsuleTop: "#E4D4FF",
      mark: "✦",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#F4EEFF"/>
          <!-- 金色钥匙扣环 -->
          <circle cx="60" cy="24" r="11" stroke="#5C4033" stroke-width="4"/>
          <circle cx="60" cy="24" r="11" stroke="#FFE082" stroke-width="1.6"/>
          <!-- 串珠链 -->
          <circle cx="60" cy="40" r="4.5" fill="#FF9EBB" stroke="#5C4033" stroke-width="2.4"/>
          <circle cx="60" cy="49" r="4.5" fill="#BCEAD5" stroke="#5C4033" stroke-width="2.4"/>
          <!-- 蓬松软萌星星吊坠 -->
          <path d="M60 50 L69 67 L88 70 L74 83 L78 102 L60 93 L42 102 L46 83 L32 70 L51 67 Z" fill="#FFE89E" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <!-- 星星蝴蝶结 -->
          <path d="M70 59 L63 54 L66 64 Z M70 59 L78 55 L75 65 Z" fill="#FF8FA3" stroke="#5C4033" stroke-width="2.2" stroke-linejoin="round"/>
          <!-- 软萌表情 -->
          <circle cx="53" cy="76" r="2.6" fill="#5C4033"/>
          <circle cx="67" cy="76" r="2.6" fill="#5C4033"/>
          <ellipse cx="48" cy="80" rx="4" ry="2.2" fill="#FF8FA3" opacity="0.75"/>
          <ellipse cx="72" cy="80" rx="4" ry="2.2" fill="#FF8FA3" opacity="0.75"/>
          <path d="M56 80 Q60 84 64 80" stroke="#5C4033" stroke-width="2.5" stroke-linecap="round"/>
          <!-- 闪光点 -->
          <path d="M26 48 L28 52 L32 54 L28 56 L26 60 L24 56 L20 54 L24 52 Z" fill="#FFB5C5"/>
          <path d="M94 42 L96 46 L100 48 L96 50 L94 54 L92 50 L88 48 L92 46 Z" fill="#FFE082"/>
        </svg>`
    },
    {
      id: "shoes",
      title: "小皮鞋一双",
      rarity: "头奖",
      rarityClass: "tag-grand",
      desc: "头奖！挑好发链接我买",
      capsuleTop: "#FFD166",
      mark: "★",
      svg: `
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="64" r="44" fill="#FFF6DC"/>
          <!-- 头奖小皇冠 -->
          <path d="M44 33 L48 20 L56 27 L60 17 L64 27 L72 20 L76 33 Z" fill="#FFD166" stroke="#5C4033" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="60" cy="27" r="2.5" fill="#FF6B8B"/>
          <!-- 蕾丝小短袜露出 -->
          <path d="M31 54 C31 46, 48 46, 51 54 V66 H31 Z" fill="#FFFDF9" stroke="#5C4033" stroke-width="3"/>
          <!-- 复古焦糖玛丽珍小皮鞋 -->
          <path d="M23 76 C23 58, 30 48, 39 48 L47 64 C59 68, 76 66, 91 72 C100 76, 101 89, 91 92 H30 C25 92, 23 86, 23 76 Z" fill="#8D553A" stroke="#5C4033" stroke-width="3.6" stroke-linejoin="round"/>
          <!-- 鞋底与低跟 -->
          <path d="M23 89 H94 V96 C94 99 91 101 87 101 H56 L51 96 H39 V101 H28 C25 101 23 99 23 96 Z" fill="#5C4033"/>
          <!-- 玛丽珍搭扣带 -->
          <path d="M51 64 C58 58, 68 60, 72 70" stroke="#FFE89E" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M51 64 C58 58, 68 60, 72 70" stroke="#5C4033" stroke-width="2" stroke-linecap="round"/>
          <!-- 珍珠小蝴蝶结 -->
          <path d="M68 64 L61 59 L62 68 Z M68 64 L76 60 L74 69 Z" fill="#FF9EBB" stroke="#5C4033" stroke-width="2.2" stroke-linejoin="round"/>
          <circle cx="68" cy="64" r="3.5" fill="#FFFDF9" stroke="#5C4033" stroke-width="2.2"/>
          <!-- 鞋头亮面高光 -->
          <path d="M80 76 C85 77, 89 80, 90 83" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.65"/>
          <!-- 闪耀星芒 -->
          <path d="M94 42 L96 47 L101 49 L96 51 L94 56 L92 51 L87 49 L92 47 Z" fill="#FFD166" stroke="#5C4033" stroke-width="1.8"/>
          <path d="M24 38 L25.5 41.5 L29 43 L25.5 44.5 L24 48 L22.5 44.5 L19 43 L22.5 41.5 Z" fill="#FF8FA3"/>
        </svg>`
    }
  ];

  const WISH_TICKET_TEMPLATE = {
    id: "wish-special",
    title: "心愿券",
    rarity: "隐藏",
    rarityClass: "tag-wish",
    desc: "还想要啥，自己写",
    isWish: true,
    svg: `
      <svg viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="64" r="44" fill="#FDF0F8"/>
        <!-- 漂浮星星与爱心 -->
        <path d="M25 32 L27 36 L31 38 L27 40 L25 44 L23 40 L19 38 L23 36 Z" fill="#FFE082"/>
        <path d="M94 28 L96 32 L100 34 L96 36 L94 40 L92 36 L88 34 L92 32 Z" fill="#FF9EBB"/>
        <!-- 许愿礼盒 -->
        <rect x="24" y="48" width="72" height="52" rx="14" fill="#FFFDF9" stroke="#5C4033" stroke-width="3.6"/>
        <path d="M26 52 L60 76 L94 52" stroke="#5C4033" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- 顶部绸带蝴蝶结 -->
        <path d="M60 46 C44 26, 26 36, 40 48 Z" fill="#FF9EBB" stroke="#5C4033" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M60 46 C76 26, 94 36, 80 48 Z" fill="#FF9EBB" stroke="#5C4033" stroke-width="3.2" stroke-linejoin="round"/>
        <circle cx="60" cy="46" r="6" fill="#FFE89E" stroke="#5C4033" stroke-width="3"/>
        <!-- 中央爱心封口章 -->
        <circle cx="60" cy="75" r="13" fill="#FFF0F4" stroke="#5C4033" stroke-width="2.8"/>
        <path d="M60 71 C57 67, 51 69, 52 74 C53 78, 60 83, 60 83 C60 83, 67 78, 68 74 C69 69, 63 67, 60 71 Z" fill="#FF6B8B" stroke="#5C4033" stroke-width="2.2"/>
      </svg>`
  };

  function getTemplateById(id) {
    if (id === WISH_TICKET_TEMPLATE.id) return WISH_TICKET_TEMPLATE;
    return PRIZE_POOL.find((p) => p.id === id) || null;
  }

  const EAR_MESSAGES = [
    "干嘛戳我耳朵",
    "再戳要脸红了",
    "好啦，偷偷多给你一枚币"
  ];

  const EAR_AFTER_MESSAGES = [
    "隐藏币已经给你啦",
    "别戳啦，快去扭蛋",
    "耳朵都被你戳红了"
  ];

  function createInitialState() {
    return {
      coins: BASE_COINS,
      coinInserted: false,
      drawnIds: [],
      tickets: [],
      earClicks: 0,
      bonusCoinClaimed: false,
      wishUnlocked: false,
      wishPromptShown: false,
      soundEnabled: true
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createInitialState();
      const parsed = JSON.parse(raw);
      return Object.assign(createInitialState(), parsed);
    } catch (e) {
      return createInitialState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // 忽略无痕模式存储限制
    }
  }

  function formatChineseTime(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    return `${y}年${m}月${d}日 ${hh}时${mm}分`;
  }

  function formatSerial(index) {
    return `第 ${String(index).padStart(2, "0")} 号`;
  }

  let state = loadState();
  let isBusy = false;
  let pendingCapsulePrize = null;
  let activeTicketId = null;
  let bubbleTimer = null;

  const els = {
    debugBar: document.getElementById("debugBar"),
    debugAddCoinBtn: document.getElementById("debugAddCoinBtn"),
    debugResetBtn: document.getElementById("debugResetBtn"),
    soundToggleBtn: document.getElementById("soundToggleBtn"),
    soundIcon: document.getElementById("soundIcon"),
    soundText: document.getElementById("soundText"),
    walletBtn: document.getElementById("walletBtn"),
    walletCount: document.getElementById("walletCount"),
    bearTopper: document.getElementById("bearTopper"),
    bearEarLeft: document.getElementById("bearEarLeft"),
    bearEarRight: document.getElementById("bearEarRight"),
    bearBubble: document.getElementById("bearBubble"),
    bonusCoinDrop: document.getElementById("bonusCoinDrop"),
    machineBody: document.getElementById("machineBody"),
    domeFrame: document.getElementById("domeFrame"),
    capsuleCanvas: document.getElementById("capsuleCanvas"),
    statusStrip: document.getElementById("statusStrip"),
    coinSlotBtn: document.getElementById("coinSlotBtn"),
    coinSlotHint: document.getElementById("coinSlotHint"),
    coinCount: document.getElementById("coinCount"),
    knobBtn: document.getElementById("knobBtn"),
    knobHint: document.getElementById("knobHint"),
    droppedCapsuleBtn: document.getElementById("droppedCapsuleBtn"),
    droppedCapTop: document.getElementById("droppedCapTop"),
    chuteEmptyText: document.getElementById("chuteEmptyText"),
    progressText: document.getElementById("progressText"),
    progressDots: document.getElementById("progressDots"),
    wishShortcutBtn: document.getElementById("wishShortcutBtn"),
    crackModal: document.getElementById("crackModal"),
    crackCapsule: document.getElementById("crackCapsule"),
    crackTop: document.getElementById("crackTop"),
    crackText: document.getElementById("crackText"),
    ticketModal: document.getElementById("ticketModal"),
    closeTicketBtn: document.getElementById("closeTicketBtn"),
    keepTicketBtn: document.getElementById("keepTicketBtn"),
    ticketCard: document.getElementById("ticketCard"),
    ticketRarity: document.getElementById("ticketRarity"),
    ticketSerial: document.getElementById("ticketSerial"),
    ticketIllustration: document.getElementById("ticketIllustration"),
    ticketTitle: document.getElementById("ticketTitle"),
    ticketDesc: document.getElementById("ticketDesc"),
    wishInputArea: document.getElementById("wishInputArea"),
    wishInput: document.getElementById("wishInput"),
    saveWishBtn: document.getElementById("saveWishBtn"),
    wishSavedNote: document.getElementById("wishSavedNote"),
    redeemedStamp: document.getElementById("redeemedStamp"),
    tearZone: document.getElementById("tearZone"),
    tearTrack: document.getElementById("tearTrack"),
    tearFill: document.getElementById("tearFill"),
    tearTrackText: document.getElementById("tearTrackText"),
    tearHandle: document.getElementById("tearHandle"),
    receiptZone: document.getElementById("receiptZone"),
    receiptTime: document.getElementById("receiptTime"),
    unlockModal: document.getElementById("unlockModal"),
    openWishNowBtn: document.getElementById("openWishNowBtn"),
    closeUnlockBtn: document.getElementById("closeUnlockBtn"),
    walletModal: document.getElementById("walletModal"),
    closeWalletBtn: document.getElementById("closeWalletBtn"),
    walletList: document.getElementById("walletList"),
    confettiCanvas: document.getElementById("confettiCanvas")
  };

  // 初始化玻璃罩物理引擎
  const dome = new window.CapsuleDomePhysics(els.capsuleCanvas);
  function syncDomeCapsules() {
    const remaining = PRIZE_POOL.filter((p) => !state.drawnIds.includes(p.id)).map((p) => ({
      id: p.id,
      topColor: p.capsuleTop,
      bottomColor: "#FFFDF9",
      mark: p.mark
    }));
    dome.setCapsules(remaining);
  }
  syncDomeCapsules();
  dome.start();

  // 彩带飘落
  function launchConfetti() {
    const canvas = els.confettiCanvas;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const colors = ["#FF8FA3", "#FFE89E", "#BCEAD5", "#D9C4FF", "#FFB5A7", "#FFD166"];
    const pieces = Array.from({ length: 56 }, () => ({
      x: w * 0.5 + (Math.random() - 0.5) * 140,
      y: h * 0.42 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 8 - 3,
      size: Math.random() * 7 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      life: 1
    }));

    function frame() {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      pieces.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.vy += 0.24;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        p.life -= 0.014;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      });
      if (alive) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    }
    requestAnimationFrame(frame);
  }

  function showBearBubble(text, duration) {
    clearTimeout(bubbleTimer);
    els.bearBubble.textContent = text;
    els.bearBubble.hidden = false;
    bubbleTimer = setTimeout(() => {
      els.bearBubble.hidden = true;
    }, duration || 2800);
  }

  function updateSoundUI() {
    window.GachaSound.setEnabled(state.soundEnabled);
    els.soundIcon.textContent = state.soundEnabled ? "🔊" : "🔇";
    els.soundText.textContent = state.soundEnabled ? "音效" : "静音";
  }

  function renderUI() {
    updateSoundUI();
    els.coinCount.textContent = String(state.coins);
    els.walletCount.textContent = String(state.tickets.length);

    const remainingPool = PRIZE_POOL.filter((p) => !state.drawnIds.includes(p.id));
    const hasPendingDrop = Boolean(pendingCapsulePrize);

    if (state.coinInserted) {
      els.coinSlotBtn.classList.add("inserted");
      els.coinSlotBtn.disabled = true;
      els.coinSlotHint.textContent = "已投币";
    } else if (hasPendingDrop) {
      els.coinSlotBtn.classList.remove("inserted");
      els.coinSlotBtn.disabled = true;
      els.coinSlotHint.textContent = "先拆蛋";
    } else if (state.coins <= 0 || remainingPool.length === 0) {
      els.coinSlotBtn.classList.remove("inserted");
      els.coinSlotBtn.disabled = true;
      els.coinSlotHint.textContent = remainingPool.length === 0 ? "抽完啦" : "没币了";
    } else {
      els.coinSlotBtn.classList.remove("inserted");
      els.coinSlotBtn.disabled = false;
      els.coinSlotHint.textContent = "投币";
    }

    if (state.coinInserted && !isBusy && !hasPendingDrop) {
      els.knobBtn.disabled = false;
      els.knobBtn.classList.add("ready");
      els.knobHint.textContent = "点我转动";
    } else {
      els.knobBtn.disabled = true;
      els.knobBtn.classList.remove("ready");
      els.knobHint.textContent = hasPendingDrop ? "出蛋啦" : "先投币";
    }

    if (hasPendingDrop) {
      els.statusStrip.textContent = "掉出来啦，点开看看";
    } else if (state.coinInserted) {
      els.statusStrip.textContent = "转一下旋钮！";
    } else if (remainingPool.length === 0) {
      els.statusStrip.textContent = "全部抽完啦！";
    } else if (state.coins > 0) {
      els.statusStrip.textContent = "投币，转一下";
    } else if (!state.bonusCoinClaimed) {
      els.statusStrip.textContent = "硬币用完啦，去卡包看看吧";
    } else {
      els.statusStrip.textContent = "都抽完啦，去卡包撕票吧";
    }

    if (hasPendingDrop) {
      els.droppedCapTop.style.background = pendingCapsulePrize.capsuleTop;
      els.droppedCapsuleBtn.hidden = false;
      els.chuteEmptyText.hidden = true;
    } else {
      els.droppedCapsuleBtn.hidden = true;
      els.chuteEmptyText.hidden = false;
    }

    const drawnCount = state.drawnIds.length;
    const capped = Math.min(drawnCount, BASE_COINS);
    els.progressText.textContent = drawnCount < BASE_COINS ? `${drawnCount} / ${BASE_COINS}` : `${drawnCount} 颗 · 已解锁心愿券`;
    els.progressDots.innerHTML = "";
    for (let i = 0; i < BASE_COINS; i++) {
      const dot = document.createElement("span");
      dot.className = "progress-dot" + (i < capped ? " filled" : "");
      els.progressDots.appendChild(dot);
    }

    els.wishShortcutBtn.hidden = !state.wishUnlocked;

  }

  function pickNextPrize() {
    const remaining = PRIZE_POOL.filter((p) => !state.drawnIds.includes(p.id));
    if (remaining.length === 0) return null;

    const nextDrawNumber = state.drawnIds.length + 1;
    if (nextDrawNumber === BASE_COINS) {
      const shoes = remaining.find((p) => p.id === "shoes");
      if (shoes) return shoes;
    }
    if (nextDrawNumber === BASE_COINS + 1) {
      const charm = remaining.find((p) => p.id === "charm");
      if (charm) return charm;
    }
    let candidates = remaining;
    if (nextDrawNumber <= 2 && remaining.length > 2) {
      const nonGrand = remaining.filter((p) => p.id !== "shoes");
      if (nonGrand.length > 0) candidates = nonGrand;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function handleInsertCoin() {
    if (isBusy || state.coinInserted || pendingCapsulePrize || state.coins <= 0) return;
    const remaining = PRIZE_POOL.filter((p) => !state.drawnIds.includes(p.id));
    if (remaining.length === 0) return;

    window.GachaSound.playCoin();
    state.coins -= 1;
    state.coinInserted = true;
    saveState();
    dome.nudge();
    renderUI();
  }

  function handleTurnKnob() {
    if (isBusy || !state.coinInserted || pendingCapsulePrize) return;
    const prize = pickNextPrize();
    if (!prize) return;

    isBusy = true;
    state.coinInserted = false;
    saveState();

    window.GachaSound.playKnobTurn();
    els.knobBtn.classList.remove("ready");
    els.knobBtn.classList.add("spinning");
    els.machineBody.classList.add("machine-shake");
    els.statusStrip.textContent = "转起来了……";
    dome.stir(10);

    setTimeout(() => {
      dome.stir(7);
    }, 320);

    setTimeout(() => {
      els.knobBtn.classList.remove("spinning");
      els.machineBody.classList.remove("machine-shake");
      dome.removeBall(prize.id);
      pendingCapsulePrize = prize;
      window.GachaSound.playDrop();
      isBusy = false;
      renderUI();
    }, 880);
  }

  function handleCrackDroppedCapsule() {
    if (isBusy || !pendingCapsulePrize) return;
    const prize = pendingCapsulePrize;
    pendingCapsulePrize = null;
    isBusy = true;

    state.drawnIds.push(prize.id);
    const ticket = {
      id: prize.id,
      serial: formatSerial(state.tickets.length + 1),
      title: prize.title,
      rarity: prize.rarity,
      rarityClass: prize.rarityClass,
      desc: prize.desc,
      redeemWay: prize.redeemWay,
      isWish: false,
      wishContent: "",
      redeemed: false,
      redeemedAt: ""
    };
    state.tickets.push(ticket);

    if (state.drawnIds.length >= BASE_COINS && !state.wishUnlocked) {
      state.wishUnlocked = true;
      state.tickets.push({
        id: WISH_TICKET_TEMPLATE.id,
        serial: "隐藏特权",
        title: WISH_TICKET_TEMPLATE.title,
        rarity: WISH_TICKET_TEMPLATE.rarity,
        rarityClass: WISH_TICKET_TEMPLATE.rarityClass,
        desc: WISH_TICKET_TEMPLATE.desc,
        redeemWay: WISH_TICKET_TEMPLATE.redeemWay,
        isWish: true,
        wishContent: "",
        redeemed: false,
        redeemedAt: ""
      });
    }
    saveState();
    renderUI();

    els.crackTop.style.background = prize.capsuleTop;
    els.crackCapsule.className = "crack-capsule wobble";
    els.crackText.textContent = "打开中……";
    els.crackModal.hidden = false;

    setTimeout(() => {
      window.GachaSound.playCrack();
      els.crackCapsule.className = "crack-capsule opened";
      els.crackText.textContent = prize.title;
      launchConfetti();
    }, 460);

    setTimeout(() => {
      els.crackModal.hidden = true;
      isBusy = false;
      openTicketModal(ticket.id);
    }, 1050);
  }

  function openTicketModal(ticketId) {
    const ticket = state.tickets.find((t) => t.id === ticketId);
    if (!ticket) return;
    const tpl = getTemplateById(ticket.id);
    activeTicketId = ticketId;

    els.ticketCard.className = "ticket-card";
    if (ticket.id === "shoes") els.ticketCard.classList.add("rarity-grand");
    if (ticket.isWish) els.ticketCard.classList.add("rarity-wish");

    els.ticketRarity.className = `rarity-tag ${(tpl && tpl.rarityClass) || ticket.rarityClass || ""}`;
    els.ticketRarity.textContent = (tpl && tpl.rarity) || ticket.rarity;
    els.ticketSerial.textContent = ticket.serial;
    els.ticketIllustration.innerHTML = (tpl && tpl.svg) || ticket.svg || "";
    els.ticketTitle.textContent = (tpl && tpl.title) || ticket.title;
    els.ticketDesc.textContent = (tpl && tpl.desc) || ticket.desc;

    // 仅心愿券显示心愿填写区，普通礼品券保持清爽无输入框
    if (ticket.isWish) {
      els.wishInputArea.hidden = false;
      els.wishInput.value = ticket.wishContent || "";
      els.wishInput.disabled = ticket.redeemed;
      els.saveWishBtn.disabled = ticket.redeemed;
    } else {
      els.wishInputArea.hidden = true;
    }

    if (ticket.redeemed) {
      if (ticket.isWish && ticket.wishContent) {
        els.wishInput.parentElement.hidden = true;
        els.wishSavedNote.textContent = `心愿：${ticket.wishContent}`;
        els.wishSavedNote.hidden = false;
      }
      els.redeemedStamp.hidden = false;
      els.tearZone.hidden = true;
      els.receiptZone.hidden = false;
      els.receiptTime.textContent = ticket.redeemedAt || formatChineseTime(new Date());
      els.keepTicketBtn.textContent = "收好";
    } else {
      if (ticket.isWish) {
        els.wishInput.parentElement.hidden = false;
        if (ticket.wishContent) {
          els.wishSavedNote.textContent = `心愿：${ticket.wishContent}`;
          els.wishSavedNote.hidden = false;
        } else {
          els.wishSavedNote.hidden = true;
        }
      }
      els.redeemedStamp.hidden = true;
      els.tearZone.hidden = false;
      els.receiptZone.hidden = true;
      els.keepTicketBtn.textContent = "收进卡包";
      resetTearSlider();
    }

    els.ticketModal.hidden = false;
  }

  function closeTicketModal() {
    els.ticketModal.hidden = true;
    activeTicketId = null;
    renderUI();

    if (state.wishUnlocked && !state.wishPromptShown) {
      state.wishPromptShown = true;
      saveState();
      setTimeout(() => {
        window.GachaSound.playUnlock();
        launchConfetti();
        els.unlockModal.hidden = false;
      }, 260);
    }
  }

  function handleSaveWish() {
    const ticket = state.tickets.find((t) => t.id === activeTicketId);
    if (!ticket || ticket.redeemed) return;
    const text = els.wishInput.value.trim();
    if (!text) {
      els.wishInput.focus();
      els.wishSavedNote.textContent = ticket.isWish
        ? "先写下你想要的小礼物或商品链接吧～"
        : "还没写内容哦，也可以直接向右撕票再微信发我～";
      els.wishSavedNote.hidden = false;
      return;
    }
    ticket.wishContent = text;
    saveState();
    window.GachaSound.playCoin();
    els.wishSavedNote.textContent = `心愿：${text}`;
    els.wishSavedNote.hidden = false;
  }

  let isDraggingTear = false;
  let tearStartX = 0;
  let tearMaxX = 0;

  function resetTearSlider() {
    els.tearHandle.style.transform = "translateX(0px)";
    els.tearFill.style.width = "0px";
    els.tearTrackText.style.opacity = "1";
    els.tearHandle.setAttribute("aria-valuenow", "0");
  }

  function completeTearRedeem() {
    const ticket = state.tickets.find((t) => t.id === activeTicketId);
    if (!ticket || ticket.redeemed) return;

    if (ticket.isWish) {
      const typed = els.wishInput.value.trim();
      if (typed) ticket.wishContent = typed;
    }
    if (ticket.isWish && !ticket.wishContent) {
      resetTearSlider();
      els.wishSavedNote.textContent = "先写下你想要啥再撕票哦";
      els.wishSavedNote.hidden = false;
      els.wishInput.focus();
      return;
    }

    ticket.redeemed = true;
    ticket.redeemedAt = formatChineseTime(new Date());
    saveState();

    window.GachaSound.playTear();
    setTimeout(() => {
      window.GachaSound.playStamp();
      launchConfetti();
    }, 180);

    openTicketModal(ticket.id);
    renderWalletList();
  }

  function onTearPointerDown(e) {
    const ticket = state.tickets.find((t) => t.id === activeTicketId);
    if (!ticket || ticket.redeemed) return;
    isDraggingTear = true;
    tearStartX = e.clientX;
    tearMaxX = Math.max(40, els.tearTrack.clientWidth - els.tearHandle.offsetWidth - 8);
    if (els.tearHandle.setPointerCapture) {
      els.tearHandle.setPointerCapture(e.pointerId);
    }
  }

  function onTearPointerMove(e) {
    if (!isDraggingTear) return;
    const dx = Math.max(0, Math.min(tearMaxX, e.clientX - tearStartX));
    const ratio = dx / tearMaxX;
    els.tearHandle.style.transform = `translateX(${dx}px)`;
    els.tearFill.style.width = `${dx + 24}px`;
    els.tearTrackText.style.opacity = String(Math.max(0.15, 1 - ratio * 1.2));
    els.tearHandle.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));

    if (ratio >= 0.84) {
      isDraggingTear = false;
      completeTearRedeem();
    }
  }

  function onTearPointerUp() {
    if (!isDraggingTear) return;
    isDraggingTear = false;
    resetTearSlider();
  }

  function handlePokeBearEar() {
    window.GachaSound.playEarPoke();
    els.bearTopper.classList.remove("ear-wiggle");
    void els.bearTopper.offsetWidth;
    els.bearTopper.classList.add("ear-wiggle");

    if (!state.bonusCoinClaimed) {
      state.earClicks += 1;
      if (state.earClicks >= 2) {
        els.bearTopper.classList.add("blushing");
      }
      if (state.earClicks < 3) {
        showBearBubble(EAR_MESSAGES[state.earClicks - 1], 2400);
      } else {
        state.bonusCoinClaimed = true;
        state.coins += 1;
        saveState();
        showBearBubble(EAR_MESSAGES[2], 3400);
        window.GachaSound.playBonusCoin();
        els.bonusCoinDrop.hidden = false;
        setTimeout(() => {
          els.bonusCoinDrop.hidden = true;
          renderUI();
        }, 980);
        renderUI();
      }
    } else {
      els.bearTopper.classList.add("blushing");
      const msg = EAR_AFTER_MESSAGES[Math.floor(Math.random() * EAR_AFTER_MESSAGES.length)];
      showBearBubble(msg, 2400);
    }
  }

  function renderWalletList() {
    if (state.tickets.length === 0) {
      els.walletList.innerHTML = `<div class="wallet-empty">还没有抽到礼物哦</div>`;
      return;
    }

    els.walletList.innerHTML = "";
    const sorted = [...state.tickets].sort((a, b) => {
      if (a.isWish && !b.isWish) return -1;
      if (!a.isWish && b.isWish) return 1;
      return 0;
    });

    sorted.forEach((ticket) => {
      const tpl = getTemplateById(ticket.id);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "wallet-item";
      const subText = ticket.wishContent
        ? `心愿：${ticket.wishContent}`
        : `${(tpl && tpl.desc) || ticket.desc}`;
      btn.innerHTML = `
        <span class="wallet-item-icon">${(tpl && tpl.svg) || ticket.svg || ""}</span>
        <span class="wallet-item-body">
          <span class="wallet-item-title">${(tpl && tpl.title) || ticket.title}</span>
          <span class="wallet-item-meta">${subText}</span>
        </span>
        <span class="wallet-status ${ticket.redeemed ? "done" : ""}">${ticket.redeemed ? "已核销" : "去撕票"}</span>
      `;
      btn.addEventListener("click", () => {
        els.walletModal.hidden = true;
        openTicketModal(ticket.id);
      });
      els.walletList.appendChild(btn);
    });
  }

  els.soundToggleBtn.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    saveState();
    updateSoundUI();
    if (state.soundEnabled) window.GachaSound.playCoin();
  });

  els.walletBtn.addEventListener("click", () => {
    renderWalletList();
    els.walletModal.hidden = false;
  });

  els.closeWalletBtn.addEventListener("click", () => {
    els.walletModal.hidden = true;
  });

  els.walletModal.addEventListener("click", (e) => {
    if (e.target === els.walletModal) els.walletModal.hidden = true;
  });

  els.domeFrame.addEventListener("click", () => {
    dome.nudge();
    window.GachaSound.playEarPoke();
  });

  [els.bearEarLeft, els.bearEarRight].forEach((ear) => {
    ear.addEventListener("click", handlePokeBearEar);
    ear.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePokeBearEar();
      }
    });
  });

  els.coinSlotBtn.addEventListener("click", handleInsertCoin);
  els.knobBtn.addEventListener("click", handleTurnKnob);
  els.droppedCapsuleBtn.addEventListener("click", handleCrackDroppedCapsule);

  els.closeTicketBtn.addEventListener("click", closeTicketModal);
  els.keepTicketBtn.addEventListener("click", closeTicketModal);
  els.saveWishBtn.addEventListener("click", handleSaveWish);

  els.tearHandle.addEventListener("pointerdown", onTearPointerDown);
  window.addEventListener("pointermove", onTearPointerMove);
  window.addEventListener("pointerup", onTearPointerUp);
  window.addEventListener("pointercancel", onTearPointerUp);
  els.tearHandle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "ArrowRight") {
      e.preventDefault();
      completeTearRedeem();
    }
  });

  els.wishShortcutBtn.addEventListener("click", () => {
    openTicketModal(WISH_TICKET_TEMPLATE.id);
  });

  els.openWishNowBtn.addEventListener("click", () => {
    els.unlockModal.hidden = true;
    openTicketModal(WISH_TICKET_TEMPLATE.id);
  });

  els.closeUnlockBtn.addEventListener("click", () => {
    els.unlockModal.hidden = true;
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("debug") === "1") {
    els.debugBar.hidden = false;
    els.debugAddCoinBtn.addEventListener("click", () => {
      state.coins += 3;
      saveState();
      renderUI();
    });
    els.debugResetBtn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state = createInitialState();
      pendingCapsulePrize = null;
      isBusy = false;
      els.bearTopper.classList.remove("blushing");
      syncDomeCapsules();
      renderUI();
    });
  }

  if (state.bonusCoinClaimed) {
    els.bearTopper.classList.add("blushing");
  }
  renderUI();
})();
