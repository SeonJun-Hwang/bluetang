import Chunker from "../src/Parser/Chunker";

describe(`0.0.1 Test`, () => {
  describe(`content 부분 join 테스트`, () => {
    it(`# 안 녕 하 세 요 -> ["h1", "안 녕 하 세 요"] `, () => {
      const expected = ["h1", "안 녕 하 세 요"];
      const chunker = new Chunker(["# 안 녕 하 세 요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`헤더 태그 변환 테스트`, () => {
    it(`# 안녕하세요 -> ["h1", "안녕하세요"] `, () => {
      const expected = ["h1", "안녕하세요"];
      const chunker = new Chunker(["# 안녕하세요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`## 안녕하세요 -> ["h2", "안녕하세요"] `, () => {
      const expected = ["h2", "안녕하세요"];
      const chunker = new Chunker(["## 안녕하세요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`### 안녕하세요 -> ["h3", "안녕하세요"] `, () => {
      const expected = ["h3", "안녕하세요"];
      const chunker = new Chunker(["### 안녕하세요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`#### 안녕하세요 -> ["h4", "안녕하세요"] `, () => {
      const expected = ["h4", "안녕하세요"];
      const chunker = new Chunker(["#### 안녕하세요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`##### 안녕하세요 -> ["h5", "안녕하세요"] `, () => {
      const expected = ["h5", "안녕하세요"];
      const chunker = new Chunker(["##### 안녕하세요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`####### 안녕하세요 -> ["h6", "안녕하세요"] `, () => {
      const expected = ["h6", "안녕하세요"];
      const chunker = new Chunker(["###### 안녕하세요"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`페이지 구분자 변환 테스트`, () => {
    it(`--- -> ["page", ""]`, () => {
      const expected = ["page", ""];
      const chunker = new Chunker(["---"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`=== -> ["page", ""]`, () => {
      const expected = ["page", ""];
      const chunker = new Chunker(["==="]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`--------- -> ["page", ""]`, () => {
      const expected = ["page", ""];
      const chunker = new Chunker(["---------"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`========= -> ["page", ""]`, () => {
      const expected = ["page", ""];
      const chunker = new Chunker(["========="]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`-=-=-=-=-=-=-=- -> ["page", ""]`, () => {
      const expected = ["page", ""];
      const chunker = new Chunker(["-=-=-=-=-=-=-=-"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`-=-=-=-=a-=-=-=- -> ["text", "-=-=-=-=a-=-=-=-"]`, () => {
      const expected = ["text", "-=-=-=-=a-=-=-=-"];
      const chunker = new Chunker(["-=-=-=-=a-=-=-=-"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`텍스트 태그 변환 테스트`, () => {
    it(`hello world -> ["text", "hello world"] `, () => {
      const expected = ["text", "hello world"];
      const chunker = new Chunker(["hello world"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`\`strong -> \` ["text", "<code>strong</code>"]`, () => {
      const expected = ["text", "<code>strong</code>"];
      const chunker = new Chunker(["`strong`"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`링크 태그 변환 테스트`, () => {
    it(`[]() -> ["a", { link: "", text: ""}]`, () => {
      const expected = ["a", { link: "", text: "" }];
      const chunker = new Chunker(["[]()"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`[herf](ggood) -> ["a", { link:"ggood", text:"herf" }]`, () => {
      const expected = ["a", { link: "ggood", text: "herf" }];
      const chunker = new Chunker(["[herf](ggood)"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`[hyper link](http://google.com) -> ["a", { link:"http://google.com", text:"hyper link" }]`, () => {
      const expected = ["a", { link: "http://google.com", text: "hyper link" }];
      const chunker = new Chunker(["[hyper link](http://google.com)"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`[hyper link](http://google.com) after text will be ignored -> ["a", { link:"http://google.com", text:"hyper link" }]`, () => {
      const expected = ["a", { link: "http://google.com", text: "hyper link" }];
      const chunker = new Chunker(["[hyper link](http://google.com)"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`이미지 태그 변환 테스트`, () => {
    it(`![]() -> ["img", { link: "", text: "" }]`, () => {
      const expected = ["img", { link: "", text: "" }];
      const chunker = new Chunker(["![]()"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`![herf](ggood) -> ["img", {link: "ggood", text: "herf" }]`, () => {
      const expected = ["img", { link: "ggood", text: "herf" }];
      const chunker = new Chunker(["![herf](ggood)"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`![hyper link](http://google.com) -> ["img", { link: "http://google.com", text: "hyper link" }]`, () => {
      const expected = ["img", { link: "http://google.com", text: "hyper link" }];
      const chunker = new Chunker(["![hyper link](http://google.com)"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`![hyper link](http://google.com) after text will be ignored -> ["img", { link: "http://google.com", text: "hyper link" }]`, () => {
      const expected = ["img", { link: "http://google.com", text: "hyper link" }];
      const chunker = new Chunker(["![hyper link](http://google.com) after text will be ignored"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });
});

describe(`0.0.2 Test`, () => {
  describe(`Strong 태그 테스트`, () => {
    it(`**strong** -> ["text", "<strong>strong</strong>"]`, () => {
      const expected = ["text", "<strong>strong</strong>"];
      const chunker = new Chunker(["**strong**"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`**I** love  -> ["text", "<strong>I</strong> love "]`, () => {
      const expected = ["text", "<strong>I</strong> love "];
      const chunker = new Chunker(["**I** love "]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`I **love**  -> ["text", "I <strong>love</strong> "]`, () => {
      const expected = ["text", "I <strong>love</strong> "];
      const chunker = new Chunker(["I **love** "]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`I love **** -> ["text", "I love <strong></strong>]`, () => {
      const expected = ["text", "I love <strong></strong>"];
      const chunker = new Chunker(["I love ****"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`**I love ** -> ["text", "<strong>I love </strong>"]`, () => {
      const expected = ["text", "<strong>I love </strong>"];
      const chunker = new Chunker(["**I love **"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`__strong__ -> ["text", "<strong>strong</strong>"]`, () => {
      const expected = ["text", "<strong>strong</strong>"];
      const chunker = new Chunker(["__strong__"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`__I__ love  -> ["text", "<strong>I</strong> love "]`, () => {
      const expected = ["text", "<strong>I</strong> love "];
      const chunker = new Chunker(["__I__ love "]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`I __love__  -> ["text", "I <strong>love</strong> "]`, () => {
      const expected = ["text", "I <strong>love</strong> "];
      const chunker = new Chunker(["I __love__ "]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`I love ____ -> ["text", "I love <strong></strong>"]`, () => {
      const expected = ["text", "I love <strong></strong>"];
      const chunker = new Chunker(["I love ____"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`__I love __ -> ["text", "<strong>I love </strong>]`, () => {
      const expected = ["text", "<strong>I love </strong>"];
      const chunker = new Chunker(["__I love __"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`Italic 변환 테스트`, () => {
    it(`*italic* -> ["text", "<em>italic</em>"]`, () => {
      const expected = ["text", "<em>italic</em>"];
      const chunker = new Chunker(["*italic*"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`_italic_ -> ["text", "<em>italic</em>"]`, () => {
      const expected = ["text", "<em>italic</em>"];
      const chunker = new Chunker(["_italic_"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`*My* best friend is marp -> ["text", "<em>My</em> best friend is marp"]`, () => {
      const expected = ["text", "<em>My</em> best friend is marp"];
      const chunker = new Chunker(["*My* best friend is marp"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`_My_ best friend is marp -> ["text", "<em>My</em> best friend is marp"]`, () => {
      const expected = ["text", "<em>My</em> best friend is marp"];
      const chunker = new Chunker(["_My_ best friend is marp"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`*My best friend* is *marp* -> ["text", "<em>My best friend</em> is <em>marp</em>"]`, () => {
      const expected = ["text", "<em>My best friend</em> is <em>marp</em>"];
      const chunker = new Chunker(["*My best friend* is *marp*"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`_My best friend_ is _marp_ -> ["text", "<em>My best friend</em> is <em>marp</em>"]`, () => {
      const expected = ["text", "<em>My best friend</em> is <em>marp</em>"];
      const chunker = new Chunker(["_My best friend_ is _marp_"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`Strong Italic 변환 테스트`, () => {
    it(`***s_italic*** -> ["text", "<strong><em>s_italic</em></strong>"]`, () => {
      const expected = ["text", "<strong><em>s_italic</em></strong>"];
      const chunker = new Chunker(["***s_italic***"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`___s_italic___ -> ["text", "<strong><em>s_italic</em></strong>"]`, () => {
      const expected = ["text", "<strong><em>s_italic</em></strong>"];
      const chunker = new Chunker(["___s_italic___"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`__*strongitalic*__ -> ["text", "<strong><em>strongitalic</em></strong>"]`, () => {
      const expected = ["text", "<strong><em>strongitalic</em></strong>"];
      const chunker = new Chunker(["__*strongitalic*__"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`**_strongitalic_** -> ["text", "<strong><em>strongitalic</em></strong>"]`, () => {
      const expected = ["text", "<strong><em>strongitalic</em></strong>"];
      const chunker = new Chunker(["**_strongitalic_**"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`_**strong italic**_ -> ["text", "<em><strong>strong italic</strong></em>"]`, () => {
      const expected = ["text", "<em><strong>strong italic</strong></em>"];
      const chunker = new Chunker(["_**strong italic**_"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`*__strong italic__* -> ["text", "<em><strong>strong italic</strong></em>"]`, () => {
      const expected = ["text", "<em><strong>strong italic</strong></em>"];
      const chunker = new Chunker(["*__strong italic__*"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`hello my name is ****** -> ["text", "hello my name is <strong><em></em></strong>"]`, () => {
      const expected = ["text", "hello my name is <strong><em></em></strong>"];
      const chunker = new Chunker(["hello my name is ******"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`hello **_my name is _** -> ["text", "hello <strong><em>my name is </em></strong>"]`, () => {
      const expected = ["text", "hello <strong><em>my name is </em></strong>"];
      const chunker = new Chunker(["hello **_my name is _**"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`인용구 태그 변환 테스트`, () => {
    it(`\`\`\`-> ["quote", ""]`, () => {
      const expected = ["quote", ""];
      const chunker = new Chunker(["```"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`\`\`\`\`\`\`-> ["code", "<code></code>"]`, () => {
      const expected = ["code", "<code></code>"];
      const chunker = new Chunker(["``````"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`\`\`\` This is code \`\`\`-> ["code", "<code> This is code </code>"]`, () => {
      const expected = ["code", "<code> This is code </code>"];
      const chunker = new Chunker(["``` This is code ```"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`리스트 태그 변환 테스트`, () => {
    it(`* test - > ["ul", "test"]`, () => {
      const expected = ["ul", "test"];
      const chunker = new Chunker(["* test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`- test -> ["ul", "test"]`, () => {
      const expected = ["ul", "test"];
      const chunker = new Chunker(["- test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`1. test -> ["ol", "test"]`, () => {
      const expected = ["ol", "test"];
      const chunker = new Chunker(["1. test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`2. test -> ["ol", "test"]`, () => {
      const expected = ["ol", "test"];
      const chunker = new Chunker(["2. test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`  - test - > ["ul", "test"]`, () => {
      const expected = ["ul", "test"];
      const chunker = new Chunker(["  - test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`  * test - > ["ul", "test"]`, () => {
      const expected = ["ul", "test"];
      const chunker = new Chunker(["  * test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });
});

describe(`0.0.4 Test`, () => {
  describe(`리스트 태그 에러 케이스`, () => {
    it(`** test - > ["text", "<em></em> test"]`, () => {
      const expected = ["text", "<em></em> test"];
      const chunker = new Chunker(["** test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`  ** test - > ["text", "  <em></em> test"]`, () => {
      const expected = ["text", "<em></em> test"];
      const chunker = new Chunker(["  ** test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`  * test - > ["ul", "test"]`, () => {
      const expected = ["ul", "test"];
      const chunker = new Chunker(["  * test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`1 test - > ["text", "1 test"]`, () => {
      const expected = ["text", "1 test"];
      const chunker = new Chunker(["1 test"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`텍스트 페어 에러 케이스`, () => {
    it(`\`code\` out \` - > ["text", "<code>code</code> out \`"]`, () => {
      const expected = ["text", "<code>code</code> out `"];
      const chunker = new Chunker(["`code` out `"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });
});

describe(`1.0.0 Test`, () => {
  describe(`html parsable Tokens 테스트`, () => {
    it(`여긴 텍스트 [링크](주소) 다시 텍스트 -> ["text", "여긴 텍스트 <a href="주소" target="_blank">링크</a> 다시 텍스트"]`, () => {
      const expected = ["text", `여긴 텍스트 <a href="주소" target="_blank">링크</a> 다시 텍스트`];
      const chunker = new Chunker(["여긴 텍스트 [링크](주소) 다시 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`여긴 텍스트 ![링크](주소) 다시 텍스트 -> ["text", "여긴 텍스트 <img src="주소" alt="링크"> 다시 텍스트"]`, () => {
      const expected = ["text", `여긴 텍스트 <img src="주소" alt="링크"> 다시 텍스트`];
      const chunker = new Chunker(["여긴 텍스트 ![링크](주소) 다시 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`# [링크](주소) 텍스트 -> ["h1", "<a href="주소" target="_blank">링크</a> 텍스트"]`, () => {
      const expected = ["h1", `<a href="주소" target="_blank">링크</a> 텍스트`];
      const chunker = new Chunker(["# [링크](주소) 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`## [링크](주소) 텍스트 -> ["h2", "<a href="주소">링크</a> 텍스트"]`, () => {
      const expected = ["h2", `<a href="주소" target="_blank">링크</a> 텍스트`];
      const chunker = new Chunker(["## [링크](주소) 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`### [링크](주소) 텍스트 -> ["h3", "<a href="주소">링크</a> 텍스트"]`, () => {
      const expected = ["h3", `<a href="주소" target="_blank">링크</a> 텍스트`];
      const chunker = new Chunker(["### [링크](주소) 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`#### [링크](주소) 텍스트 -> ["h4", "<a href="주소">링크</a> 텍스트"]`, () => {
      const expected = ["h4", `<a href="주소" target="_blank">링크</a> 텍스트`];
      const chunker = new Chunker(["#### [링크](주소) 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`##### [링크](주소) 텍스트 -> ["h5", "<a href="주소">링크</a> 텍스트"]`, () => {
      const expected = ["h5", `<a href="주소" target="_blank">링크</a> 텍스트`];
      const chunker = new Chunker(["##### [링크](주소) 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`####### [링크](주소) 텍스트 -> ["h6", "<a href="주소">링크</a> 텍스트"]`, () => {
      const expected = ["h6", `<a href="주소" target="_blank">링크</a> 텍스트`];
      const chunker = new Chunker(["###### [링크](주소) 텍스트"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });
});
