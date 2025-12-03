/**
 * Korean Name Generator
 * 
 * 사용자 입력 이름과 키워드를 기반으로 한글 이름 옵션을 생성합니다.
 * 나중에 OpenAI API로 교체할 수 있도록 구조화되어 있습니다.
 */

// 영어 발음을 한글 발음으로 변환하는 매핑
const SOUND_MAP: Record<string, string[]> = {
  // 자음
  'm': ['ㅁ'], 'n': ['ㄴ'], 'p': ['ㅍ', 'ㅂ'], 'b': ['ㅂ'], 't': ['ㅌ', 'ㅅ'], 
  'd': ['ㄷ'], 'k': ['ㅋ', 'ㄱ'], 'g': ['ㄱ'], 's': ['ㅅ', 'ㅆ'], 'z': ['ㅈ'],
  'ch': ['ㅊ', 'ㅈ'], 'j': ['ㅈ'], 'sh': ['ㅅ', 'ㅆ'], 'h': ['ㅎ'], 'l': ['ㄹ', 'ㄴ'], 'r': ['ㄹ'],
  'f': ['ㅍ'], 'v': ['ㅂ'], 'th': ['ㅅ'], 'w': ['ㅇ', 'ㅜ'], 'y': ['ㅇ', 'ㅣ'],
  
  // 모음
  'a': ['ㅏ', '아'], 'e': ['ㅔ', '에', 'ㅓ'], 'i': ['ㅣ', '이'], 'o': ['ㅗ', '오'], 'u': ['ㅜ', '우'],
  'ae': ['ㅐ', '애'], 'ai': ['ㅐ', '애'], 'au': ['ㅗ', '오'], 'ea': ['ㅓ', '어'],
  'ee': ['ㅣ', '이'], 'ei': ['ㅔ', '에'], 'ie': ['ㅣ', '이'], 'oa': ['ㅗ', '오'],
  'oo': ['ㅜ', '우'], 'ou': ['ㅜ', '우'], 'ue': ['ㅜ', '우'], 'ui': ['ㅟ', '위'],
};

// 키워드별 의미 풀
const KEYWORD_MEANINGS: Record<string, {
  hanja: string[];
  trendy: string[];
  pure: string[];
}> = {
  elegant: {
    hanja: ['雅', '美', '淑', '慧', '妍'],
    trendy: ['원', '예', '린', '서', '아'],
    pure: ['아름', '고운', '예쁜', '맑은', '밝은'],
  },
  strong: {
    hanja: ['強', '勇', '健', '剛', '力'],
    trendy: ['민', '준', '현', '진', '호'],
    pure: ['강한', '튼튼', '굳은', '단단', '힘찬'],
  },
  nature: {
    hanja: ['山', '水', '木', '花', '月'],
    trendy: ['하늘', '바다', '산', '강', '별'],
    pure: ['하늘', '바람', '물', '꽃', '별'],
  },
  creative: {
    hanja: ['創', '藝', '文', '美', '智'],
    trendy: ['예', '아', '린', '서', '지'],
    pure: ['빛나는', '밝은', '새로운', '신선', '찬란'],
  },
  peaceful: {
    hanja: ['和', '靜', '安', '寧', '祥'],
    trendy: ['은', '아', '서', '예', '린'],
    pure: ['고요', '평화', '안온', '차분', '맑은'],
  },
  adventurous: {
    hanja: ['冒', '探', '勇', '進', '拓'],
    trendy: ['민', '준', '현', '진', '호'],
    pure: ['용감', '대담', '모험', '도전', '활발'],
  },
};

// 한자 이름 생성 (음차 + 한자)
function generateHanjaName(name: string, keyword: string): {
  koreanName: string;
  meaning: string;
  description: string;
} {
  const nameLower = name.toLowerCase();
  const sounds = convertToKoreanSounds(nameLower);
  const keywordData = KEYWORD_MEANINGS[keyword] || KEYWORD_MEANINGS.elegant;
  
  // 발음을 기반으로 한글 이름 생성
  let koreanName = '';
  if (sounds.length >= 2) {
    koreanName = sounds.slice(0, 2).join('');
  } else {
    koreanName = sounds[0] + '라';
  }
  
  // 한자 의미 추가
  const hanja = keywordData.hanja[Math.floor(Math.random() * keywordData.hanja.length)];
  const meanings: Record<string, string> = {
    elegant: 'Refined and graceful - like polished silk',
    strong: 'Powerful and resilient - unbreakable spirit',
    nature: 'Connected to nature - mountain and water',
    creative: 'Artistic and innovative - creative mind',
    peaceful: 'Calm and harmonious - peaceful soul',
    adventurous: 'Bold and daring - adventurous heart',
  };
  
  return {
    koreanName,
    meaning: meanings[keyword] || meanings.elegant,
    description: `Based on sound similarity with deep traditional meaning (${hanja})`,
  };
}

// 트렌디 이름 생성 (한국인 이름 스타일)
function generateTrendyName(name: string, keyword: string): {
  koreanName: string;
  meaning: string;
  description: string;
} {
  const nameLower = name.toLowerCase();
  const keywordData = KEYWORD_MEANINGS[keyword] || KEYWORD_MEANINGS.elegant;
  
  // 첫 글자 발음 기반
  const firstSound = nameLower[0];
  const trendyPrefixes: Record<string, string[]> = {
    'm': ['마', '민', '미', '문', '명'],
    'n': ['나', '노', '누', '니', '네'],
    'p': ['파', '피', '포', '푸', '프'],
    'b': ['바', '비', '보', '부', '브'],
    't': ['타', '티', '토', '투', '트'],
    'd': ['다', '디', '도', '두', '드'],
    'k': ['카', '키', '코', '쿠', '크'],
    'g': ['가', '기', '고', '구', '그'],
    's': ['사', '시', '소', '수', '스'],
    'c': ['차', '치', '초', '추', '츠'],
    'j': ['자', '지', '조', '주', '주'],
    'h': ['하', '히', '호', '후', '흐'],
    'l': ['라', '리', '로', '루', '르'],
    'r': ['라', '리', '로', '루', '르'],
    'a': ['아', '애', '안', '알', '암'],
    'e': ['에', '은', '을', '음', '엘'],
    'i': ['이', '인', '일', '임', '일'],
    'o': ['오', '온', '올', '옴', '옥'],
    'u': ['우', '운', '울', '움', '욱'],
  };
  
  const prefix = trendyPrefixes[firstSound]?.[Math.floor(Math.random() * trendyPrefixes[firstSound].length)] || '마';
  const suffix = keywordData.trendy[Math.floor(Math.random() * keywordData.trendy.length)];
  
  const koreanName = prefix + suffix;
  
  const meanings: Record<string, string> = {
    elegant: 'Elegant and refined - modern Korean style',
    strong: 'Strong and confident - contemporary feel',
    nature: 'Natural and fresh - like a breeze',
    creative: 'Creative and artistic - unique style',
    peaceful: 'Peaceful and calm - serene beauty',
    adventurous: 'Adventurous and bold - dynamic energy',
  };
  
  return {
    koreanName,
    meaning: meanings[keyword] || meanings.elegant,
    description: 'Contemporary Korean name style',
  };
}

// 순우리말 이름 생성
function generatePureKoreanName(name: string, keyword: string): {
  koreanName: string;
  meaning: string;
  description: string;
} {
  const keywordData = KEYWORD_MEANINGS[keyword] || KEYWORD_MEANINGS.elegant;
  
  const pureNames: Record<string, string[]> = {
    elegant: ['아름', '예쁜', '고운', '맑은', '밝은'],
    strong: ['강한', '튼튼', '굳은', '단단', '힘찬'],
    nature: ['하늘', '바람', '물', '꽃', '별'],
    creative: ['빛', '새벽', '별', '달', '해'],
    peaceful: ['고요', '평화', '안온', '차분', '맑은'],
    adventurous: ['용기', '바람', '하늘', '별', '해'],
  };
  
  const nameList = pureNames[keyword] || pureNames.elegant;
  const koreanName = nameList[Math.floor(Math.random() * nameList.length)];
  
  const meanings: Record<string, string> = {
    elegant: 'Beautiful and pure - natural beauty',
    strong: 'Strong and solid - unbreakable',
    nature: 'Connected to nature - natural element',
    creative: 'Bright and shining - creative spark',
    peaceful: 'Peaceful and calm - serene nature',
    adventurous: 'Bold and free - adventurous spirit',
  };
  
  return {
    koreanName,
    meaning: meanings[keyword] || meanings.elegant,
    description: 'Pure Korean word with natural imagery',
  };
}

// 영어 발음을 한글 발음으로 변환
function convertToKoreanSounds(englishName: string): string[] {
  const sounds: string[] = [];
  let i = 0;
  
  while (i < englishName.length) {
    // 2글자 조합 먼저 확인
    if (i < englishName.length - 1) {
      const twoChar = englishName.slice(i, i + 2);
      if (SOUND_MAP[twoChar]) {
        sounds.push(SOUND_MAP[twoChar][0]);
        i += 2;
        continue;
      }
    }
    
    // 1글자 확인
    const oneChar = englishName[i];
    if (SOUND_MAP[oneChar]) {
      sounds.push(SOUND_MAP[oneChar][0]);
    }
    i++;
  }
  
  return sounds.length > 0 ? sounds : ['마', '라'];
}

// 메인 생성 함수
export function generateKoreanNameOptions(name: string, keyword: string): Array<{
  id: string;
  type: string;
  koreanName: string;
  meaning: string;
  description: string;
}> {
  // 이름과 키워드를 기반으로 고유한 옵션 생성
  const seed = name.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + keyword.length;
  
  // 시드 기반으로 다양한 옵션 생성
  const options = [
    {
      id: 'a',
      type: 'Hanja (Traditional)',
      ...generateHanjaName(name, keyword),
    },
    {
      id: 'b',
      type: 'Trendy (Modern)',
      ...generateTrendyName(name, keyword),
    },
    {
      id: 'c',
      type: 'Pure Korean',
      ...generatePureKoreanName(name, keyword),
    },
  ];
  
  return options;
}

