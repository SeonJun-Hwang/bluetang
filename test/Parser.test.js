import Parser from "../src/Parser";

describe(`0.0.2 test`, () => {
  describe(`ul Html 테스트`, () => {
    it(`* test -> <ul><li>test</li></ul>`, () => {
      const expected = `<ul><li>test</li></ul>`;
      const parser = new Parser(`---\n* test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`* test\n  * 1\n  * 2 -> <ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`, () => {
      const expected = `<ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`;
      const parser = new Parser(`---\n* test\n  * 1\n  * 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`- test -> <ul><li>test</li></ul>`, () => {
      const expected = `<ul><li>test</li></ul>`;
      const parser = new Parser(`---\n- test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`- test\n  - 1\n  - 2 -> <ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`, () => {
      const expected = `<ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`;
      const parser = new Parser(`---\n- test\n  - 1\n  - 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`- test\n  * 1\n  * 2 -> <ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`, () => {
      const expected = `<ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`;
      const parser = new Parser(`---\n- test\n  * 1\n  * 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`* test\n  - 1\n  - 2 -> <ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`, () => {
      const expected = `<ul><li>test<ul><li>1</li><li>2</li></ul></li></ul>`;
      const parser = new Parser(`---\n* test\n  - 1\n  - 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });

  describe(`ol Html 테스트`, () => {
    it(`1. test -> <ol><li>test</li></ol>`, () => {
      const expected = `<ol><li>test</li></ol>`;
      const parser = new Parser(`---\n1. test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`1. test\n  1. 1\n  2. 2 -> <ol><li>test<ol><li>1</li><li>2</li></ol></li></ol>`, () => {
      const expected = `<ol><li>test<ol><li>1</li><li>2</li></ol></li></ol>`;
      const parser = new Parser(`---\n1. test\n  1. 1\n  2. 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`1. test\n1. 1\n2. 2 -> <ol><li>test</li><li>1</li><li>2</li></ol>`, () => {
      const expected = `<ol><li>test</li><li>1</li><li>2</li></ol>`;
      const parser = new Parser(`---\n1. test\n1. 1\n2. 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`1. test\n3. 1\n2. 2 -> <ol><li>test</li><li>1</li><li>2</li></ol>`, () => {
      const expected = `<ol><li>test</li><li>1</li><li>2</li></ol>`;
      const parser = new Parser(`---\n1. test\n3. 1\n2. 2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });

  describe(`ol ul 혼합 Html 테스트`, () => {
    it(`1. test\n* test -> <ol><li>test</li></ol><ul><li>test</li></ul>`, () => {
      const expected = `<ol><li>test</li></ol><ul><li>test</li></ul>`;
      const parser = new Parser(`---\n1. test\n* test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`* abcd\n  * efg\n1. 1234 -> <ul><li>abcd<ul><li>efg</li></ul></li></ul><ol><li>1234</li></ol>`, () => {
      const expected = `<ul><li>abcd<ul><li>efg</li></ul></li></ul><ol><li>1234</li></ol>`;
      const parser = new Parser(`---\n* abcd\n  * efg\n1. 1234`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`ol ul 섞기\n* ss\n* ss\n  1. asdf\n  5. asdfsdf\n  3. asdfasdf\n  asdfasdfasdfasd\n* abcd\n  * efg\n1. 1234
    -> <p>ol ul 섞기</p><ul><li>ss</li><li>ss<ol><li>asdf</li><li>asdfsdf</li><li>asdfasdf</li></ol></li></ul><p>asdfasdfasdfasd</p><ul><li>abcd<ul><li>efg</li></ul></li></ul><ol><li>1234</li></ol>`, () => {
      const expected = `<p>ol ul 섞기</p><ul><li>ss</li><li>ss<ol><li>asdf</li><li>asdfsdf</li><li>asdfasdf</li></ol></li></ul><p>asdfasdfasdfasd</p><ul><li>abcd<ul><li>efg</li></ul></li></ul><ol><li>1234</li></ol>`;
      const parser = new Parser(`---\nol ul 섞기\n* ss\n* ss\n  1. asdf\n  5. asdfsdf\n  3. asdfasdf\n  asdfasdfasdfasd\n* abcd\n  * efg\n1. 1234`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`* ul 1\n* ul 2\n  * ul ul 1\n  1. ol 1 -> <ul><li>ul 1</li><li>ul 2<ul><li>ul ul 1</li></ul><ol><li>ol 1</li></ol></li></ul>`, () => {
      const expected = `<ul><li>ul 1</li><li>ul 2<ul><li>ul ul 1</li></ul><ol><li>ol 1</li></ol></li></ul>`;
      const parser = new Parser(`---\n* ul 1\n* ul 2\n  * ul ul 1\n  1. ol 1`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });

  describe(`list depth 테스트`, () => {
    it(`1. test\n  1. test\n    1. test -> <ol><li>test<ol><li>test<ol><li>test</li></ol></li></ol></li></ol>`, () => {
      const expected = `<ol><li>test<ol><li>test<ol><li>test</li></ol></li></ol></li></ol>`;
      const parser = new Parser(`---\n1. test\n  1. test\n    1. test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`* test\n  * test\n    * test -> <ul><li>test<ul><li>test<ul><li>test</li></ul></li></ul></li></ul>`, () => {
      const expected = `<ul><li>test<ul><li>test<ul><li>test</li></ul></li></ul></li></ul>`;
      const parser = new Parser(`---\n* test\n  * test\n    * test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`* test\n  * test1\n  * test2\n    * test 3\n  * test4\n* tt -> <ul><li>test<ul><li>test1</li><li>test2<ul><li>test 3</li></ul></li><li>test4</li></ul></li><li>tt</li></ul>`, () => {
      const expected = `<ul><li>test<ul><li>test1</li><li>test2<ul><li>test 3</li></ul></li><li>test4</li></ul></li><li>tt</li></ul>`;
      const parser = new Parser(`---\n* test\n  * test1\n  * test2\n    * test 3\n  * test4\n* tt`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });

  describe(`multi-line quote 테스트`, () => {
    it(`\`\`\`\nthis is quote\n\`\`\` -> <pre>this is quote</pre>`, () => {
      const expected = `<pre>this is quote</pre>`;
      const parser = new Parser(`---\n\`\`\`\nthis is quote\n\`\`\``);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`\`\`\`\ntest- -> <pre>test</pre>`, () => {
      const expected = `<pre>test</pre>`;
      const parser = new Parser(`---\n\`\`\`\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`\`\`\`\nabcdefghijk\n          lmnopqrstuvwxyz\n\`\`\` -> <pre>abcdefghijk\n          lmnopqrstuvwxyz</pre>`, () => {
      const expected = `<pre>abcdefghijk\n          lmnopqrstuvwxyz</pre>`;
      const parser = new Parser(`---\n\`\`\`\nabcdefghijk\n          lmnopqrstuvwxyz\n\`\`\``);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`\`\`\`\n* h1\n** h2\n---\n![image](url)\n\`\`\` -> <pre>* h1\n** h2\n---\n![image](url)</pre>`, () => {
      const expected = `<pre>* h1\n** h2\n---\n![image](url)</pre>`;
      const parser = new Parser(`---\n\`\`\`\n* h1\n** h2\n---\n![image](url)\n\`\`\``);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });
});

describe(`0.0.3 test`, () => {
  describe(`공통 style 테스트`, () => {
    it(`{bgColor=red}\n# h1 -> <h1 style="background-color: red;">h1</h1>`, () => {
      const expected = `<h1 style="background-color: red;">h1</h1>`;
      const parser = new Parser(`---\n{bgColor=red}\n# h1`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\n## h2 -> <h2 style="background-color: red;">h2</h2>`, () => {
      const expected = `<h2 style="background-color: red;">h2</h2>`;
      const parser = new Parser(`---\n{bgColor=red}\n## h2`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\n### h3 -> <h3 style="background-color: red;">h3</h3>`, () => {
      const expected = `<h3 style="background-color: red;">h3</h3>`;
      const parser = new Parser(`---\n{bgColor=red}\n### h3`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\n#### h4 -> <h4 style="background-color: red;">h4</h4>`, () => {
      const expected = `<h4 style="background-color: red;">h4</h4>`;
      const parser = new Parser(`---\n{bgColor=red}\n#### h4`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\n##### h5 -> <h5 style="background-color: red;">h5</h5>`, () => {
      const expected = `<h5 style="background-color: red;">h5</h5>`;
      const parser = new Parser(`---\n{bgColor=red}\n##### h5`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\n###### h6 -> <h6 style="background-color: red;">h6</h6>`, () => {
      const expected = `<h6 style="background-color: red;">h6</h6>`;
      const parser = new Parser(`---\n{bgColor=red}\n###### h6`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\n* test -> <ul style="background-color: red;"><li>test</li></ul>`, () => {
      const expected = `<ul style="background-color: red;"><li>test</li></ul>`;
      const parser = new Parser(`---\n{bgColor=red}\n* test`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{bgColor=red}\ntest -> <p style="background-color: red;">test</p>`, () => {
      const expected = `<p style="background-color: red;">test</p>`;
      const parser = new Parser(`---\n{bgColor=red}\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });

  describe(`absoulte position 테스트`, () => {
    it(`{x=10}\ntest -> <p style="position: absolute; left: 0; top: 0; transform: translate(10px, 0px); ">test</p>`, () => {
      const expected = `<p style="position: absolute; left: 0; top: 0; transform: translate(10px, 0px); ">test</p>`;
      const parser = new Parser(`---\n{x=10}\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{y=10}\ntest -> <p style="position: absolute; left: 0; top: 0; transform: translate(0px, 10px); ">test</p>`, () => {
      const expected = `<p style="position: absolute; left: 0; top: 0; transform: translate(0px, 10px); ">test</p>`;
      const parser = new Parser(`---\n{y=10}\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{z=1}\ntest -> <p style="position:absolute; left: 0; top: 0; transform: translate(0px, 0px); z-index: 1;">test</p>`, () => {
      const expected = `<p style="position: absolute; left: 0; top: 0; transform: translate(0px, 0px); z-index: 1;">test</p>`;
      const parser = new Parser(`---\n{z=1}\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{x=10 y=10}\ntest -> <p style="position: absolute; left: 0; top: 0; transform: translate(10px, 10px); ">test</p>`, () => {
      const expected = `<p style="position: absolute; left: 0; top: 0; transform: translate(10px, 10px); ">test</p>`;
      const parser = new Parser(`---\n{x=10 y=10}\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });

    it(`{x=10 y=10 z=1}\ntest -> <p style="position: absolute; left: 0; top: 0; transform: translate(10px, 10px); z-index: 1;">test</p>`, () => {
      const expected = `<p style="position: absolute; left: 0; top: 0; transform: translate(10px, 10px); z-index: 1;">test</p>`;
      const parser = new Parser(`---\n{x=10 y=10 z=1}\ntest`);
      const html = parser
        .getTokens()[0]
        .getChildTokens()
        .reduce((prev, curr) => `${prev}${curr.html()}`, "");
      expect(html).toEqual(expected);
    });
  });

  describe(`Style type check 테스트`, () => {
    it(`{} -> ["style", {}]`, () => {
      const expected = ["style", {}];
      const chunker = new Chunker(["{}"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(` {} -> ["text", " {}"]`, () => {
      const expected = ["text", " {}"];
      const chunker = new Chunker([" {}"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`{}  -> ["style", {}]`, () => {
      const expected = ["style", {}];
      const chunker = new Chunker(["{} "]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`Style chunking 테스트`, () => {
    it(`{a=3 b=3 c=asdf} -> ["style", {a: '3', b: '3', c: 'asdf'}]`, () => {
      const expected = ["style", { a: "3", b: "3", c: "asdf" }];
      const chunker = new Chunker(["{a=3 b=3 c=asdf}"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`{a=1 2 3 b=34 5 } -> ["style", {a: '1', b: '34'}]`, () => {
      const expected = ["style", { a: "1", b: "34" }];
      const chunker = new Chunker(["{a=1 2 3 b=34 5 }"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(`X, Y, Z 절대값 Style 테스트`, () => {
    it(`{x=3 y=4 z=7} -> ["style", {x:'3', y:'4', z:'7'}]`, () => {
      const expected = ["style", { x: "3", y: "4", z: "7" }];
      const chunker = new Chunker(["{x=3 y=4 z=7}"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`{x=-3 y=-4 z=-7} -> ["style", {x:'-3', y:'-4', z:'-7'}]`, () => {
      const expected = ["style", { x: "-3", y: "-4", z: "-7" }];
      const chunker = new Chunker(["{x=-3 y=-4 z=-7}"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });

    it(`{x=99999 y=99999 z=99999} -> ["style", {x:'99999', y:'99999', z: '99999'}]`, () => {
      const expected = ["style", { x: "99999", y: "99999", z: "99999" }];
      const chunker = new Chunker(["{x=99999 y=99999 z=99999}"]);
      expect(chunker.getChunks()[0]).toEqual(expect.arrayContaining(expected));
    });
  });
});
