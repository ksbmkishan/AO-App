import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Colors } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';
import MyHeader from '../../../components/MyHeader';
import * as SanatanActions from '../../../redux/actions/sanatanActions'
import { useDispatch } from 'react-redux';
import { colors } from '../../../config/Constants1';


const signSecrets = {
  'मेष राशि': {
    description:
      'Aries, the first sign of the zodiac, is bold, dynamic, and fiercely independent. Ruled by Mars, this sign exudes energy, determination, and an unstoppable drive to conquer challenges. Let’s dive into the fascinating world of Aries!',
    details: {
      title: '1.	♈ Aries – The Fiery Trailblazer 🔥',

      nature: 'Fire Element 🔥',
      rulingPlanet: 'Mars 🪐 (Planet of War & Passion)',
      zodiacNumber: '1️⃣',
      symbol: 'The Ram 🐏 (A sign of strength & leadership)',
      dates: 'March 21 - April 19',
      luckyColors: 'Red, Scarlet, White & Yellow 🎨',
      luckyNumbers: '1, 9, 6',
      dayOfPower: 'Tuesday',
      compatibility: {
        bestMatches: 'Leo ♌, Sagittarius ♐, Gemini ♊, Aquarius ♒',
        challengingMatches: 'Cancer ♋, Capricorn ♑, Pisces ♓',
      },
      personalityTraits: [
        'Fearless & Confident – They never hesitate to take the lead.',
        'Passionate & Driven – Their energy is infectious, and they love challenges.',
        'Straightforward & Honest – They say it as it is, with no sugarcoating!',
        'Competitive & Ambitious – Winning is in their blood.',
        'Impulsive & Short-Tempered – They act first, think later!',
        'Independent & Free-Spirited – They hate being told what to do.',
      ],
      strengths: [
        'Natural-born leaders',
        'Strong willpower',
        'Adventurous & risk-takers',
        'Enthusiastic & full of life',
      ],

      weaknesses: [
        'Easily frustrated',
        'Impatient & impulsive',
        'Can be aggressive or argumentative',
        'Struggles with routine and boredom',
      ],

      dos: [
        'Take up leadership roles – you shine the brightest there!',
        'Engage in physical activities – sports, workouts, adventure trips.',
        'Follow your instincts – your gut feeling is usually right.',
        'Wear red or yellow often for good luck.',
        'Surround yourself with positive and goal-oriented people.',
      ],
      donts: [
        'Don’t let anger control you – breathe before reacting.',
        'Avoid impulsive decisions, especially in relationships and finances.',
        'Don’t engage in meaningless conflicts – save energy for important battles.',
        'Avoid monotonous jobs – you need excitement and action!',
      ],
      funFacts: [
        'Aries is the "Warrior of the Zodiac" – always ready for action.',
        'Their motto: "I am. I conquer. I lead."',
        'Most sportspeople & entrepreneurs are Aries – they thrive in competition.',
        'Aries are natural trendsetters – they do things first, and others follow!',
        'Their biggest challenge? Patience! They want everything NOW!',
      ],

      finalThought: [
        'Aries are bold, fearless, and unstoppable! If they set their mind on something, nothing can hold them back. Whether leading a team, taking risks, or starting a new adventure, Aries lights up the world with their unmatched energy and passion.',
        'So, if you have an Aries in your life – buckle up! It’s going to be one wild and exciting ride! 🚀'

      ],

      ZodicPower:
        ' Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Mars (Mangala) ',
      God: ' Lord Hanuman  ',
      link: 3
    },
  },



  'वृषभ राशि': {
    description:
      'Taurus individuals are known for their strength, reliability, and love for comfort and luxury. They are determined and steadfast, always working toward long-term goals with patience and perseverance.',
    details: {
      title: '2 ♉ Taurus – The Unshakable Powerhouse 🌿🐂',
      nature: 'Earth Element 🌍',
      rulingPlanet: 'Venus 💫 (Planet of Love & Beauty)',
      zodiacNumber: '2️⃣',
      symbol: 'The Bull 🐂 (A sign of strength & perseverance)',
      dates: 'April 20 - May 20',
      luckyColors: 'Green, Pink, Blue 🎨',
      luckyNumbers: '2, 6, 8',
      dayOfPower: 'Friday',
      compatibility: {
        bestMatches: 'Virgo ♍, Capricorn ♑, Cancer ♋, Pisces ♓',
        challengingMatches: 'Leo ♌, Aquarius ♒, Aries ♈',
      },
      personalityTraits: [
        'Grounded & Practical – Taurus always keeps a steady footing in life.',
        'Loyal & Dependable – They are the ones you can rely on in any situation.',
        'Lover of Comfort & Luxury – They value the finer things in life.',
        'Patient & Persevering – They may take their time, but they never give up.',
        'Strong-Willed & Stubborn – Once they set their mind on something, it’s hard to change their course.',
        'Sensual & Artistic – They have a refined taste for beauty, art, and indulgence.',
      ],
      strengths: [
        'Highly reliable and trustworthy',
        'Incredible patience and perseverance',
        'Great financial management skills',
        'Strong work ethic and determination',
      ],
      weaknesses: [
        'Can be very stubborn and resistant to change',
        'Prone to materialistic tendencies',
        'Slow to adapt to new situations',
        'Can be possessive and overprotective',
      ],
      dos: [
        'Stick to routines – stability is your superpower!',
        'Invest in long-term financial security – you are great at building wealth.',
        "Surround yourself with beauty – whether it's art, nature, or music.",
        'Wear green or blue often for good luck.',
        'Practice patience – slow and steady wins the race.',
      ],
      donts: [
        'Don’t resist change too much – some flexibility is good.',
        'Avoid holding grudges – forgiveness brings peace.',
        'Don’t be overly materialistic – experiences matter too.',
        'Avoid laziness – comfort is great, but don’t get too relaxed!',
      ],
      funFacts: [
        'Taurus is the "Rock of the Zodiac" – stable, dependable, and unshakable.',
        'Their motto: "I build. I secure. I enjoy."',
        'Most chefs, artists, and bankers are Taurus – they have a taste for luxury & security.',
        'Taurus love good food, nature, and physical touch – they indulge in life’s pleasures.',
        'Their biggest challenge? Letting go! They struggle with change and moving on.',
      ],
      finalThought: [
        'Taurus are strong, patient, and deeply loyal. They create stability in an ever-changing world, offering unwavering support to those they love. Whether in relationships, careers, or personal growth, Taurus moves at their own steady pace—but always reaches the finish line.',
        'So, if you have a Taurus in your life – cherish them! They are the ones who will always stand by you, no matter what. 💚🐂'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Venus (Shukra) ',
      God: 'Goddess Lakshmi',
      link: 5
    }
  },



  'मिथुन राशि': {
    description:
      'Gemini, the third sign of the zodiac, is witty, adaptable, and full of energy. Ruled by Mercury, they thrive on communication, ideas, and constant movement. Let’s explore the fascinating world of Gemini!',
    details: {
      title: '3.♊ Gemini – The Curious Communicator 🌬️✨',
      nature: 'Air Element 🌬️',
      rulingPlanet: 'Mercury 📡 (Planet of Communication & Intelligence)',
      zodiacNumber: '3️⃣',
      symbol: 'The Twins 👯‍♂️ (A sign of duality & curiosity)',
      dates: 'May 21 - June 20',
      luckyColors: 'Yellow, Green, Light Blue 🎨',
      luckyNumbers: '5, 7, 14',
      dayOfPower: 'Wednesday',
      compatibility: {
        bestMatches: 'Libra ♎, Aquarius ♒, Aries ♈, Leo ♌',
        challengingMatches: 'Virgo ♍, Pisces ♓, Scorpio ♏',
      },
      personalityTraits: [
        'Intelligent & Quick-Witted – Always full of ideas and clever solutions.',
        'Social & Talkative – They love conversations and making new connections.',
        'Energetic & Adventurous – They are always up for new experiences.',
        'Adaptable & Versatile – Can adjust to any situation effortlessly.',
        'Inquisitive & Curious – Constantly seeking knowledge and new insights.',
        'Playful & Witty – Their humor is sharp and contagious.',
      ],
      strengths: [
        'Excellent communication skills',
        'Quick learners and open-minded',
        'Highly adaptable and flexible',
        'Charismatic and entertaining',
      ],
      weaknesses: [
        'Can be indecisive and inconsistent',
        'Struggles with commitment and focus',
        'May come across as superficial or unpredictable',
        'Gets bored easily and craves constant stimulation',
      ],
      dos: [
        'Engage in stimulating conversations – you thrive on intellectual exchange.',
        'Travel frequently – new experiences fuel your soul.',
        'Take up creative hobbies – writing, music, or public speaking.',
        'Wear yellow or light blue for positivity and luck.',
        'Keep learning – your mind needs constant growth and challenges.',
      ],
      donts: [
        'Don’t overcommit – focus on a few things rather than juggling too much.',
        'Avoid unnecessary gossip – your words hold power, use them wisely.',
        'Don’t be too restless – learn to enjoy the present moment.',
        'Avoid making impulsive decisions – think before you act.',
      ],
      funFacts: [
        'Gemini is the "Chameleon of the Zodiac" – constantly evolving and adapting.',
        'Their motto: "I think. I explore. I connect."',
        'Most writers, journalists, public speakers, and entrepreneurs are Geminis.',
        'They have dual personalities – sometimes playful, sometimes deeply thoughtful.',
        'Their biggest challenge? Commitment! They love freedom and hate being tied down.',
      ],

      finalThought: [
        'Geminis are intelligent, charming, and endlessly curious. They bring excitement to life with their energy and ability to see multiple perspectives. Whether debating ideas, cracking jokes, or exploring new places, a Gemini is always one step ahead of the conversation.',
        ' So, if you have a Gemini in your life – be ready for endless laughter, deep discussions, and spontaneous adventures! 🌟✨ '

      ],

      ZodicPower: ' Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW! ',
      RulingPlanet: ' Mercury (Budha) ',
      God: 'Goddess Durga ',
      link: 2

    },
  },


  'कर्क राशि': {
    description:
      'Cancer, the fourth sign of the zodiac, is deeply emotional, intuitive, and protective. Ruled by the Moon, they are known for their nurturing nature, strong intuition, and deep emotional bonds. Let’s dive into the sensitive yet powerful world of Cancer!',
    details: {
      title: '4. ♋ Cancer – The Nurturing Protector 🌊💙',

      nature: 'Water Element 💧',
      rulingPlanet: 'Moon 🌙 (Planet of Emotions & Intuition)',
      zodiacNumber: '4️⃣',
      symbol: 'The Crab 🦀 (A sign of emotional depth & resilience)',
      dates: 'June 21 - July 22',
      luckyColors: 'White, Silver, Light Blue 🎨',
      luckyNumbers: '2, 7, 11',
      dayOfPower: 'Monday',
      compatibility: {
        bestMatches: 'Scorpio ♏, Pisces ♓, Taurus ♉, Virgo ♍',
        challengingMatches: 'Aries ♈, Libra ♎, Aquarius ♒',
      },
      personalityTraits: [
        'Deeply Emotional & Intuitive – Feels things deeply and senses energies effortlessly.',
        'Protective & Loyal – Will stand by loved ones through thick and thin.',
        'Compassionate & Nurturing – Always ready to care for others.',
        'Imaginative & Creative – Gifted with artistic and poetic talents.',
        'Strong Memory & Sentimental – Holds onto emotions and cherished memories.',
        'Cautious & Reserved – Takes time to trust but remains deeply devoted.',
      ],
      strengths: [
        'Extremely loving and family-oriented',
        'Highly intuitive and spiritually inclined',
        'Strong emotional intelligence',
        'Patient and dependable',
      ],
      weaknesses: [
        'Can be moody and overly sensitive',
        'Prone to emotional withdrawal when hurt',
        'Struggles with letting go of the past',
        'Can be overly protective or possessive',
      ],
      dos: [
        'Nurture relationships – love and family are your strengths.',
        'Trust your intuition – your gut feelings are often right.',
        'Surround yourself with peace – soft music, candles, and nature calm you.',
        'Wear white or silver for emotional balance.',
        'Express your emotions – keeping things inside can be overwhelming.',
      ],
      donts: [
        'Don’t hold onto grudges – letting go heals your heart.',
        'Avoid overprotecting loved ones – let them grow on their own.',
        'Don’t isolate yourself – seek comfort in trusted friends and family.',
        'Avoid mood swings controlling you – find grounding activities like meditation.',
      ],
      funFacts: [
        'Cancer is the "Guardian of the Zodiac" – deeply protective and loving.',
        'Their motto: "I feel. I protect. I nurture."',
        'Most healers, chefs, therapists, and artists are Cancerians.',
        'They have a tough exterior but a soft heart – like their crab symbol!',
        'Their biggest challenge? Emotional balance! Their moods shift like the tides.',
      ],
      finalThought: [
        'Cancers are gentle, intuitive, and fiercely protective. They bring warmth, love, and emotional depth to those around them. Whether as a friend, partner, or family member, a Cancer will always put their heart and soul into relationships. So, if you have a Cancer in your life – treasure them! They are rare gems who love deeply and forever. 💙🦀',
        ' So, if you have a Cancer in your life – treasure them! They are rare gems who love deeply and forever. 💙🦀 '

      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Moon (Chandra)  ',
      God: 'Lord Shiva ',
      link: 11
    },
  },



  'सिंह राशि': {
    description:
      'Leo, the fifth sign of the zodiac, is bold, charismatic, and full of life. Ruled by the Sun, they shine with confidence, warmth, and an undeniable royal presence. Let’s explore the powerful and radiant world of Leo!',
    details: {
      title: '5. ♌ Leo – The Regal Leader 🔥👑',
      nature: 'Fire Element 🔥',
      rulingPlanet: 'Sun ☀️ (Planet of Power & Vitality)',
      zodiacNumber: '5️⃣',
      symbol: 'The Lion 🦁 (A sign of strength & leadership)',
      dates: 'July 23 - August 22',
      luckyColors: 'Gold, Orange, Yellow 🎨',
      luckyNumbers: '1, 3, 9',
      dayOfPower: 'Sunday',
      compatibility: {
        bestMatches: 'Aries ♈, Sagittarius ♐, Gemini ♊, Libra ♎',
        challengingMatches: 'Taurus ♉, Scorpio ♏, Capricorn ♑',
      },
      personalityTraits: [
        'Confident & Charismatic – Commands attention wherever they go.',
        'Natural Leader & Influencer – Born to lead and inspire others.',
        'Loyal & Protective – Fiercely devoted to loved ones.',
        'Energetic & Optimistic – Brings light and positivity to any situation.',
        'Creative & Passionate – Excels in artistic and performance-based fields.',
        'Proud & Determined – Takes pride in their achievements and never backs down.',
      ],
      strengths: [
        'Fearless and courageous',
        'Magnetic and charming personality',
        'Generous and big-hearted',
        'Strong sense of justice and fairness',
      ],
      weaknesses: [
        'Can be overly proud or egotistical',
        'Struggles with criticism and rejection',
        'Prone to being dramatic or attention-seeking',
        'Can be possessive in relationships',
      ],
      dos: [
        'Step into leadership roles – you are a born leader.',
        'Surround yourself with positivity – you thrive in an uplifting environment.',
        'Express yourself – through art, music, or performance.',
        'Wear gold or yellow to enhance your luck and energy.',
        'Appreciate others – generosity brings you even more admiration.',
      ],
      donts: [
        'Don’t let ego overpower you – humility adds to your greatness.',
        "Avoid arrogance – respect others' viewpoints.",
        'Don’t take criticism personally – use it to grow stronger.',
        'Avoid being overly dominating – leadership should inspire, not control.',
      ],
      funFacts: [
        'Leo is the "King of the Zodiac" – bold, proud, and powerful.',
        'Their motto: "I lead. I create. I shine."',
        'Most actors, leaders, CEOs, and performers are Leos.',
        'They have a golden aura – their energy is warm and radiant.',
        'Their biggest challenge? Humility! Learning to balance pride with modesty.',
      ],
      finalThought: [
        'Leos are confident, passionate, and born to shine. Their presence lights up any room, and their leadership inspires greatness in others. Whether as a friend, partner, or mentor, a Leo will stand by you fiercely and make life grand.',
        ' So, if you have a Leo in your life – consider yourself lucky! They are the most loyal and uplifting souls you’ll ever meet. 🔥👑'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Sun (Surya)  ',
      God: 'Lord Vishnu & Lord Narasimha  ',
      link: 8
    },
  },



  'कन्या राशि': {
    description:
      'Virgo, the sixth sign of the zodiac, is practical, intelligent, and detail-oriented. Ruled by Mercury, they excel in organization, analysis, and problem-solving. Let’s explore the refined and insightful world of Virgo!',
    details: {
      title: '6. ♍ Virgo – The Meticulous Perfectionist 🌿✨',

      nature: 'Earth Element 🌍',
      rulingPlanet: 'Mercury 📡 (Planet of Communication & Intelligence)',
      zodiacNumber: '6️⃣',
      symbol: 'The Maiden 👩‍🌾 (A sign of purity & wisdom)',
      dates: 'August 23 - September 22',
      luckyColors: 'Green, Brown, White 🎨',
      luckyNumbers: '5, 7, 14',
      dayOfPower: 'Wednesday',
      compatibility: {
        bestMatches: 'Taurus ♉, Capricorn ♑, Cancer ♋, Scorpio ♏',
        challengingMatches: 'Gemini ♊, Sagittarius ♐, Aquarius ♒',
      },
      personalityTraits: [
        'Analytical & Detail-Oriented – Notices what others overlook.',
        'Practical & Logical – Takes a realistic approach to life.',
        'Hardworking & Disciplined – Dedicated to perfection in all they do.',
        'Loyal & Reliable – Always there when you need them.',
        'Organized & Methodical – Loves structure and order.',
        'Humble & Modest – Prefers actions over flashy words.',
      ],
      strengths: [
        'Excellent problem-solving skills',
        'Highly dependable and responsible',
        'Great at organizing and planning',
        'Strong sense of duty and ethics',
      ],
      weaknesses: [
        'Can be overly critical, even of themselves',
        'Prone to stress and overthinking',
        'Struggles with spontaneity and change',
        'May seem emotionally distant or reserved',
      ],
      dos: [
        'Pay attention to your health – your well-being is essential.',
        'Keep your surroundings organized – a clutter-free space boosts productivity.',
        'Trust yourself – don’t overanalyze every decision.',
        'Wear green or white to enhance peace and clarity.',
        'Take breaks – balance work with relaxation.',
      ],
      donts: [
        'Don’t be too hard on yourself – perfection isn’t always necessary.',
        'Avoid micromanaging – trust others to do their part.',
        'Don’t suppress emotions – open up to those who care.',
        'Avoid being overly cautious – take calculated risks.',
      ],
      funFacts: [
        'Virgo is the "Perfectionist of the Zodiac" – precise, practical, and efficient.',
        'Their motto: "I analyze. I improve. I serve."',
        'Most scientists, doctors, editors, and strategists are Virgos.',
        'They are masters of multitasking – can handle multiple tasks flawlessly.',
        'Their biggest challenge? Letting go! They struggle with accepting imperfections.',
      ],
      finalThought: [
        'Virgos are intelligent, dependable, and dedicated. They bring clarity, order, and efficiency to every aspect of life. Whether as a friend, colleague, or partner, a Virgo will always have your back with their sharp mind and thoughtful care.',
        ' So, if you have a Virgo in your life – cherish them! They are the quiet strength that keeps everything running smoothly. 🌿✨'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW! ',
      RulingPlanet: 'Mercury (Budha)  ',
      God: 'Goddess Durga ',
      link: 2
    },
  },



  'तुला राशि': {
    description:
      'Libra, the seventh sign of the zodiac, is graceful, balanced, and deeply attuned to harmony. Ruled by Venus, they thrive in beauty, relationships, and diplomacy. Let’s explore the sophisticated and enchanting world of Libra!',
    details: {
      title: '7. ♎ Libra – The Charming Diplomat ⚖️✨',

      nature: 'Air Element 🌬️',
      rulingPlanet: 'Venus 💫 (Planet of Love & Aesthetics)',
      zodiacNumber: '7️⃣',
      symbol: 'The Scales ⚖️ (A sign of balance & justice)',
      dates: 'September 23 - October 22',
      luckyColors: 'Blue, Pink, Pastel Shades 🎨',
      luckyNumbers: '6, 9, 15',
      dayOfPower: 'Friday',
      compatibility: {
        bestMatches: 'Gemini ♊, Aquarius ♒, Leo ♌, Sagittarius ♐',
        challengingMatches: 'Cancer ♋, Capricorn ♑, Pisces ♓',
      },
      personalityTraits: [
        'Charming & Social – People are naturally drawn to their charisma.',
        'Fair & Diplomatic – Always strives for justice and equality.',
        'Lover of Beauty & Art – Appreciates aesthetics in everything.',
        'Graceful & Elegant – Moves and speaks with poise.',
        'Peaceful & Harmonious – Avoids conflict and seeks balance.',
        'Romantic & Idealistic – Believes in love and meaningful relationships.',
      ],
      strengths: [
        'Excellent at resolving conflicts',
        'Natural peacemakers and diplomats',
        'Great sense of style and aesthetics',
        'Friendly and approachable personality',
      ],
      weaknesses: [
        'Can be indecisive and hesitant',
        'Struggles with confrontation and setting boundaries',
        'Prone to people-pleasing tendencies',
        'Can be superficial or too focused on appearances',
      ],
      dos: [
        'Surround yourself with beauty – art, music, and fashion uplift you.',
        'Strengthen decision-making skills – trust your judgment.',
        'Keep socializing – relationships bring out the best in you.',
        'Wear blue or pink for balance and luck.',
        'Stand up for yourself – don’t always compromise.',
      ],
      donts: [
        'Don’t avoid difficult conversations – confrontation is sometimes necessary.',
        'Avoid overthinking – not every decision needs endless debate.',
        'Don’t rely too much on others for validation – your opinion matters.',
        'Avoid being too passive – take charge when needed.',
      ],
      funFacts: [
        'Libra is the "Peacemaker of the Zodiac" – always striving for fairness.',
        'Their motto: "I balance. I harmonize. I connect."',
        'Most artists, diplomats, fashion designers, and judges are Libras.',
        'They are masters of persuasion – their words can smooth any situation.',
        'Their biggest challenge? Decision-making! They analyze every angle before choosing.',
      ],
      finalThought: [
        'Libras are graceful, diplomatic, and relationship-oriented. They bring balance, beauty, and harmony to the world around them. Whether as a friend, partner, or colleague, a Libra will make life more pleasant, peaceful, and beautiful.',
        ' So, if you have a Libra in your life – treasure them! Their charm, kindness, and elegance are truly one of a kind. ⚖️✨'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Venus (Shukra)  ',
      God: 'Goddess Lakshmi  ',
      link: 5
    },
  },



  'वृश्चिक राशि': {
    description:
      'Scorpio, the eighth sign of the zodiac, is intense, passionate, and deeply transformative. Ruled by Mars and Pluto, they are known for their magnetic personality, strong intuition, and emotional depth. Let’s uncover the mysterious and powerful world of Scorpio!',
    details: {
      title: '8. ♏ Scorpio – The Mysterious Powerhouse 🦂🔥',

      nature: 'Water Element 💧',
      rulingPlanets: 'Mars 🔥 & Pluto 🪐 (Planets of Power & Transformation)',
      zodiacNumber: '8️⃣',
      symbol: 'The Scorpion 🦂 (A sign of depth & resilience)',
      dates: 'October 23 - November 21',
      luckyColors: 'Black, Deep Red, Maroon 🎨',
      luckyNumbers: '9, 11, 21',
      dayOfPower: 'Tuesday',
      compatibility: {
        bestMatches: 'Cancer ♋, Pisces ♓, Virgo ♍, Capricorn ♑',
        challengingMatches: 'Leo ♌, Aquarius ♒, Gemini ♊',
      },
      personalityTraits: [
        'Intense & Passionate – They do everything with full dedication.',
        'Mysterious & Secretive – They reveal themselves only to a chosen few.',
        'Emotionally Deep & Strong – They feel everything profoundly.',
        'Highly Determined & Focused – Once they set a goal, nothing can stop them.',
        'Magnetic & Charismatic – People are naturally drawn to their aura.',
        'Loyal & Protective – Fiercely devoted to those they care about.',
      ],
      strengths: [
        'Strong-willed and courageous',
        'Sharp intuition and psychic abilities',
        'Excellent at uncovering truths and solving mysteries',
        'Extremely loyal and trustworthy',
      ],
      weaknesses: [
        'Can be controlling or possessive',
        'Prone to jealousy and suspicion',
        'Struggles with letting go of grudges',
        'Emotionally intense and sometimes unpredictable',
      ],
      dos: [
        'Trust your instincts – your intuition is your superpower.',
        'Keep your emotions in check – channel them productively.',
        'Surround yourself with loyal and trustworthy people.',
        'Wear black or deep red for strength and confidence.',
        'Use your deep understanding of human nature wisely.',
      ],
      donts: [
        'Don’t hold onto grudges – forgiveness brings peace.',
        'Avoid being overly secretive – vulnerability can be powerful too.',
        'Don’t manipulate situations – honesty earns lasting respect.',
        'Avoid unnecessary conflicts – your energy is best spent elsewhere.',
      ],
      funFacts: [
        'Scorpio is the "Phoenix of the Zodiac" – constantly evolving and transforming.',
        'Their motto: "I desire. I transform. I conquer."',
        'Most detectives, psychologists, surgeons, and entrepreneurs are Scorpios.',
        'They are masters of reading people – nothing escapes their perception.',
        'Their biggest challenge? Trust! They take time to let people in.',
      ],
      finalThought: [
        'Scorpios are intense, fearless, and deeply passionate. They bring transformation, mystery, and emotional depth to everything they do. Whether as a friend, partner, or mentor, a Scorpio will stand by you fiercely and protect what they love at all costs.',
        ' So, if you have a Scorpio in your life – consider yourself lucky! Their loyalty, strength, and depth are unmatched. 🦂🔥'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Mars (Mangala) ',
      God: 'Lord Hanuman',
      link: 3
    },
  },



  'धनु राशि': {
    description:
      'Sagittarius, the ninth sign of the zodiac, is adventurous, optimistic, and full of wisdom. Ruled by Jupiter, they are seekers of truth, freedom, and endless possibilities. Let’s dive into the exhilarating and boundless world of Sagittarius!',
    details: {
      title: '9. ♐ Sagittarius – The Free-Spirited Explorer 🌍🔥',

      nature: 'Fire Element 🔥',
      rulingPlanet: 'Jupiter 🪐 (Planet of Expansion & Wisdom)',
      zodiacNumber: '9️⃣',
      symbol: 'The Archer 🏹 (A sign of exploration & higher learning)',
      dates: 'November 22 - December 21',
      luckyColors: 'Purple, Blue, Turquoise 🎨',
      luckyNumbers: '3, 5, 8',
      dayOfPower: 'Thursday',
      compatibility: {
        bestMatches: 'Aries ♈, Leo ♌, Libra ♎, Aquarius ♒',
        challengingMatches: 'Taurus ♉, Virgo ♍, Pisces ♓',
      },
      personalityTraits: [
        'Adventurous & Free-Spirited – They crave new experiences and exploration.',
        'Optimistic & Enthusiastic – Always sees the bright side of life.',
        'Intelligent & Philosophical – Deep thinkers with a thirst for knowledge.',
        'Honest & Straightforward – Speaks the truth, sometimes too bluntly!',
        'Independent & Unstoppable – Hates being tied down or restricted.',
        'Energetic & Fun-Loving – Their lively spirit makes them the life of the party.',
      ],
      strengths: [
        'Open-minded and always eager to learn',
        'Excellent sense of humor and great at storytelling',
        'Inspiring and motivating to others',
        'Highly independent and adaptable',
      ],
      weaknesses: [
        'Can be restless and impatient',
        'Tends to be brutally honest, sometimes hurting others',
        'Struggles with long-term commitments',
        'Can be careless or irresponsible at times',
      ],
      dos: [
        'Travel often – new experiences fuel your soul.',
        'Follow your curiosity – keep learning and expanding your mind.',
        'Stay spontaneous – your best moments happen unexpectedly.',
        'Wear purple or turquoise for luck and creativity.',
        'Embrace your independent spirit – but remember to stay grounded.',
      ],
      donts: [
        'Don’t overcommit – focus on what truly matters.',
        'Avoid tactless honesty – choose words wisely.',
        'Don’t fear routine – some structure is beneficial.',
        'Avoid running from emotions – confront them head-on.',
      ],
      funFacts: [
        'Sagittarius is the "Wanderer of the Zodiac" – always chasing new horizons.',
        'Their motto: "I seek. I explore. I inspire."',
        'Most travelers, philosophers, comedians, and professors are Sagittarians.',
        'They are natural risk-takers – always up for an adventure.',
        'Their biggest challenge? Commitment! They love freedom and resist limitations.',
      ],
      finalThought: [
        'Sagittarius are adventurous, wise, and full of life. They bring excitement, laughter, and deep insight wherever they go. Whether as a friend, partner, or mentor, a Sagittarius will open your mind, uplift your spirit, and take you on a journey of endless possibilities.',
        ' So, if you have a Sagittarius in your life – get ready for fun, adventure, and inspiration like never before! 🏹🔥'
      ],
      ZodicPower: ' Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Jupiter (Guru)',
      God: 'Lord Vishnu',
      link: 8
    },
  },



  'मकर राशि': {
    description:
      'Capricorn, the tenth sign of the zodiac, is determined, disciplined, and highly goal-oriented. Ruled by Saturn, they are known for their patience, responsibility, and unwavering drive for success. Let’s uncover the strong and steady world of Capricorn!',
    details: {
      title: '10. ♑ Capricorn – The Ambitious Achiever 🏔️✨',

      nature: 'Earth Element 🌍',
      rulingPlanet: 'Saturn 🪐 (Planet of Discipline & Karma)',
      zodiacNumber: '1️⃣0️⃣',
      symbol: 'The Sea Goat 🐐 (A sign of ambition & endurance)',
      dates: 'December 22 - January 19',
      luckyColors: 'Black, Grey, Dark Green 🎨',
      luckyNumbers: '4, 8, 22',
      dayOfPower: 'Saturday',
      compatibility: {
        bestMatches: 'Taurus ♉, Virgo ♍, Scorpio ♏, Pisces ♓',
        challengingMatches: 'Aries ♈, Gemini ♊, Leo ♌',
      },
      personalityTraits: [
        'Ambitious & Hardworking – They set big goals and achieve them.',
        'Disciplined & Responsible – Always committed to duty.',
        'Practical & Grounded – Prefers logic over emotions.',
        'Patient & Persistent – Success takes time, and they know it.',
        'Loyal & Protective – They stand by their loved ones.',
        'Wise & Mature – Often seen as the “old souls” of the zodiac.',
      ],
      strengths: [
        'Highly reliable and disciplined',
        'Exceptional planners and strategists',
        'Strong sense of responsibility and ethics',
        'Resilient and determined in tough situations',
      ],
      weaknesses: [
        'Can be too serious and work-focused',
        'Struggles with expressing emotions',
        'Tends to be overly cautious and conservative',
        'Prone to being stubborn or rigid in thinking',
      ],
      dos: [
        'Set long-term goals – success is your destiny.',
        'Balance work and personal life – relationships matter too.',
        'Stay patient – great things take time.',
        'Wear black or dark green for strength and focus.',
        'Surround yourself with like-minded, driven individuals.',
      ],
      donts: [
        'Don’t overwork yourself – burnout is real.',
        'Avoid being too critical – perfection isn’t always necessary.',
        'Don’t ignore emotions – vulnerability is strength.',
        'Avoid resisting change – adaptability leads to growth.',
      ],
      funFacts: [
        'Capricorn is the "CEO of the Zodiac" – born to lead and achieve.',
        'Their motto: "I build. I endure. I succeed."',
        'Most business leaders, politicians, and strategists are Capricorns.',
        'They are masters of time management – always planning ahead.',
        'Their biggest challenge? Letting loose! They often forget to relax and enjoy life.',
      ],
      finalThought: [
        'Capricorns are ambitious, wise, and deeply committed to success. They bring structure, stability, and reliability to any situation. Whether as a friend, partner, or mentor, a Capricorn will always push you to be your best and help build a strong foundation for the future.',
        ' So, if you have a Capricorn in your life – respect their hustle, admire their discipline, and remind them to have some fun along the way! 🏔️✨'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Saturn (Shani)  ',
      God: 'Lord Hanuman  ',
      link:3
    },
  },


  'कुंभ राशि': {
    description:
      'Aquarius, the eleventh sign of the zodiac, is innovative, free-spirited, and deeply intellectual. Ruled by Saturn and Uranus, they are known for their unconventional thinking, progressive mindset, and humanitarian spirit. Let’s dive into the futuristic and enigmatic world of Aquarius!',
    details: {
      title: '11. ♒ Aquarius – The Visionary Rebel 🌬️⚡',

      nature: 'Air Element 🌬️',
      rulingPlanets:
        'Saturn 🪐 & Uranus ⚡ (Planets of Structure & Innovation)',
      zodiacNumber: '1️⃣1️⃣',
      symbol: 'The Water Bearer 🌊 (A sign of wisdom & enlightenment)',
      dates: 'January 20 - February 18',
      luckyColors: 'Blue, Turquoise, Silver 🎨',
      luckyNumbers: '4, 7, 11',
      dayOfPower: 'Saturday',
      compatibility: {
        bestMatches: 'Gemini ♊, Libra ♎, Sagittarius ♐, Aries ♈',
        challengingMatches: 'Taurus ♉, Cancer ♋, Scorpio ♏',
      },
      personalityTraits: [
        'Innovative & Forward-Thinking – Always ahead of their time.',
        'Intelligent & Logical – Loves deep discussions and new ideas.',
        'Independent & Unconventional – Values freedom and uniqueness.',
        'Social & Charismatic – Makes friends from all walks of life.',
        'Humanitarian & Altruistic – Passionate about making the world better.',
        'Quirky & Eccentric – Marches to the beat of their own drum.',
      ],
      strengths: [
        'Brilliant problem-solvers and strategists',
        'Open-minded and accepting of different perspectives',
        'Natural-born leaders and trendsetters',
        'Deeply loyal to their beliefs and causes',
      ],
      weaknesses: [
        'Can be emotionally detached or distant',
        'Prone to rebellious or unpredictable behavior',
        'Struggles with expressing personal emotions',
        'Can be stubborn and resistant to tradition',
      ],
      dos: [
        'Embrace your uniqueness – you were born to stand out.',
        'Follow your passions – innovation is your strength.',
        'Keep learning – your thirst for knowledge is endless.',
        'Wear blue or turquoise for clarity and luck.',
        'Engage in humanitarian work – helping others fulfills you.',
      ],
      donts: [
        'Don’t suppress emotions – vulnerability is a strength.',
        'Avoid being too rebellious – sometimes rules are necessary.',
        'Don’t isolate yourself – meaningful connections matter.',
        'Avoid overanalyzing emotions – trust your heart too.',
      ],
      funFacts: [
        'Aquarius is the "Genius of the Zodiac" – always thinking outside the box.',
        'Their motto: "I innovate. I rebel. I inspire."',
        'Most scientists, activists, inventors, and tech leaders are Aquarians.',
        'They are natural disruptors – breaking rules to create a better future.',
        'Their biggest challenge? Emotional intimacy! They struggle to open up.',
      ],
      finalThought: [
        'Aquarians are visionary, intelligent, and fiercely independent. They bring originality, progress, and humanitarian values to everything they do. Whether as a friend, partner, or mentor, an Aquarius will challenge your thinking, inspire change, and push boundaries for a better world.',
        ' So, if you have an Aquarius in your life – embrace their uniqueness, respect their freedom, and get ready for groundbreaking ideas! 🌬️⚡'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Saturn (Shani) ',
      God: ' Lord Hanuman   ',
      link: 3
    },
  },


  'मीन राशि': {
    description:
      'Pisces, the twelfth and final sign of the zodiac, is deeply intuitive, compassionate, and artistic. Ruled by Jupiter and Neptune, they are known for their vivid imagination, emotional depth, and spiritual wisdom. Let’s dive into the mystical and enchanting world of Pisces!',
    details: {
      title: '12. ♓ Pisces – The Dreamy Mystic 🌊✨',

      nature: 'Water Element 💧',
      rulingPlanets:
        'Jupiter 🪐 & Neptune 🌊 (Planets of Expansion & Illusion)',
      zodiacNumber: '1️⃣2️⃣',
      symbol: 'The Fish 🐟 (A sign of fluidity & intuition)',
      dates: 'February 19 - March 20',
      luckyColors: 'Sea Green, Lavender, Blue 🎨',
      luckyNumbers: '3, 7, 12',
      dayOfPower: 'Thursday',
      compatibility: {
        bestMatches: 'Cancer ♋, Scorpio ♏, Taurus ♉, Capricorn ♑',
        challengingMatches: 'Gemini ♊, Leo ♌, Aquarius ♒',
      },
      personalityTraits: [
        'Intuitive & Spiritual – Deeply connected to unseen energies.',
        'Empathetic & Compassionate – Feels emotions intensely.',
        'Creative & Imaginative – A dreamer with artistic talents.',
        'Gentle & Adaptable – Moves with the flow of life.',
        'Romantic & Idealistic – Believes in deep, soulful connections.',
        'Mysterious & Enigmatic – Hard to fully understand, but deeply profound.',
      ],
      strengths: [
        'Strong intuition and psychic abilities',
        'Naturally artistic and poetic',
        'Kind-hearted and deeply understanding',
        'Can bring peace and healing to others',
      ],
      weaknesses: [
        'Can be overly sensitive or emotional',
        'Struggles with setting boundaries',
        'Tends to escape reality when overwhelmed',
        'Can be indecisive or overly trusting',
      ],
      dos: [
        'Trust your intuition – your inner voice is powerful.',
        'Express yourself creatively – art, music, or writing.',
        'Surround yourself with positive energy – avoid negativity.',
        'Wear sea green or lavender for inner peace.',
        'Set clear boundaries – protect your energy.',
      ],
      donts: [
        'Don’t absorb negative emotions – protect your peace.',
        'Avoid over-romanticizing situations – see things clearly.',
        'Don’t escape through unhealthy habits – face challenges head-on.',
        'Avoid being overly self-sacrificing – your needs matter too.',
      ],
      funFacts: [
        'Pisces is the "Mystic of the Zodiac" – deeply spiritual and intuitive.',
        'Their motto: "I dream. I feel. I believe."',
        'Most artists, poets, healers, and musicians are Pisceans.',
        'They are highly psychic – often sensing things before they happen.',
        'Their biggest challenge? Boundaries! They give too much of themselves.',
      ],
      finalThought: [
        'Pisces are dreamy, kind-hearted, and spiritually gifted. They bring magic, compassion, and artistic beauty to the world. Whether as a friend, partner, or healer, a Pisces will touch your soul with their depth, love, and wisdom.',
        ' So, if you have a Pisces in your life – cherish them! Their love, intuition, and creativity make life truly magical. 🌊✨'
      ],
      ZodicPower: 'Tap to worship your ruling deity and receive divine blessings for success, abundance, and wish fulfillment! 🚀 One click can change your destiny! 🙏🔥 Click NOW!',
      RulingPlanet: 'Jupiter (Guru)  ',
      God: 'Lord Vishnu',
      link: 8

    },
  },


};



const englishToHindiMap = {
  Aries: 'मेष राशि',
  Taurus: 'वृषभ राशि',
  Gemini: 'मिथुन राशि',
  Cancer: 'कर्क राशि',
  Leo: 'सिंह राशि',
  Virgo: 'कन्या राशि',
  Libra: 'तुला राशि',
  Scorpio: 'वृश्चिक राशि',
  Sagittarius: 'धनु राशि',
  Capricorn: 'मकर राशि',
  Aquarius: 'कुंभ राशि',
  Pisces: 'मीन राशि',
};



const SignSecret = ({ navigation }) => {
  const route = useRoute();
  const { signName } = route.params || {};
  const dispatch = useDispatch();

  // Convert English name to Hindi if needed
  const hindiSignName = englishToHindiMap[signName] || signName;
  const descriptionData = signSecrets[hindiSignName];

  console.log('Received signName:', signName);
  console.log('Mapped to Hindi:', hindiSignName);
  console.log('Sign Description:', descriptionData);
  console.log('Details:', descriptionData?.details);

  if (!descriptionData || !descriptionData.details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No details available for {hindiSignName}
        </Text>
      </View>
    );
  }

  const details = descriptionData.details;

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={'Sign Secret'} navigation={navigation} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={{ ...Fonts.PoppinsMedium, bottom: 4 }}>
            {details?.title}
          </Text>
          <View style={{ gap: 10 }}>
            <Text style={styles.description}>{descriptionData.description}</Text>

            <Text style={styles.sectionHeader}>🌟 Basic Profile</Text>
            <Text style={styles.detailText}>🔹 Nature: {details.nature}</Text>
            <Text style={styles.detailText}>
              🔹 Ruling Planet: {details.rulingPlanet}
            </Text>
            <Text style={styles.detailText}>
              🔹 Zodiac Number: {details.zodiacNumber}
            </Text>
            <Text style={styles.detailText}>🔹 Symbol: {details.symbol}</Text>
            <Text style={styles.detailText}>
              🔹 Lucky Colors: {details.luckyColors}
            </Text>
            <Text style={styles.detailText}>
              🔹 Lucky Numbers: {details.luckyNumbers}
            </Text>
            <Text style={styles.detailText}>
              🔹 Day of Power: {details.dayOfPower}
            </Text>

            <Text style={styles.sectionHeader}>💖 Compatibility</Text>
            <Text style={styles.detailText}>
              ✅ Best Matches: {details.compatibility.bestMatches}
            </Text>
            <Text style={styles.detailText}>
              🚫 Challenging Matches: {details.compatibility.challengingMatches}
            </Text>

            <Text style={styles.sectionHeader}>⚡ Key Personality Traits</Text>
            {details.personalityTraits.map((trait, index) => (
              <Text key={index} style={styles.detailText}>
                ✔ {trait}
              </Text>
            ))}

            <Text style={styles.sectionHeader}>🏆 Strengths & Weaknesses</Text>
            <Text style={styles.detailText}>✅ Strengths:</Text>
            {details.strengths.map((strength, index) => (
              <Text key={index} style={styles.detailText}>
                • {strength}
              </Text>
            ))}
            <Text style={styles.sectionHeader}>❌ Weaknesses:</Text>
            {details.weaknesses.map((weakness, index) => (
              <Text key={index} style={styles.detailText}>
                • {weakness}
              </Text>
            ))}

            <Text style={styles.sectionHeader}>🔥 Do’s & Don’ts for Aries</Text>
            {
              details.dos.map((dos, index) => (
                <Text key={index} style={styles.detailText}> • {dos}</Text>
              ))
            }
            <Text style={styles.sectionHeader}>❌ Don’ts:</Text>

            {
              details.donts.map((donts, index) => (
                <Text key={index} style={styles.detailText}> • {donts}</Text>
              ))
            }

            <Text style={styles.sectionHeader}>🔮 Fun & Catchy Aries Facts</Text>

            {
              details.funFacts.map((funFacts, index) => (
                <Text key={index} style={styles.detailText}> • {funFacts}</Text>
              ))
            }

            <Text style={styles.sectionHeader}>✨ Final Thought</Text>

            {
              details.finalThought.map((finalThought, index) => (
                <Text key={index} style={styles.detailText}> • {finalThought}</Text>
              ))
            }

            <Text style={styles.sectionHeader}>🔮 Unlock Your Zodiac Power! ✨</Text>
            <Text style={styles.detailText}>  {details?.ZodicPower}</Text>
            <Text style={[styles.detailText,{...Fonts.PoppinsMedium}]}>RulingPlanet: {details?.RulingPlanet}</Text>

            <Text style={[styles.detailText, { ...Fonts.PoppinsMedium }]}> God: {details?.God}</Text>
            <TouchableOpacity
            onPress={() => {
              dispatch(SanatanActions.setSantanVisibleIndex(details?.link));
              dispatch(SanatanActions.setSantanCurrentIndex(0));
              navigation.navigate('Sanatan');
            }}
            style={{alignSelf: 'center',backgroundColor:colors.background_theme2,borderRadius:Sizes.fixPadding, padding:Sizes.fixPadding}}
            >
              <Text style={{color:'white'}}>{details?.God}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignSecret;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.fixPadding,
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    ...Fonts.PoppinsRegular,
    fontSize: 14,
  },
  sectionHeader: {
    ...Fonts.PoppinsMedium,
  },
  detailText: {
    ...Fonts.PoppinsRegular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.red,
  },
});
