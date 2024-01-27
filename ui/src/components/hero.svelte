<script lang="ts">
  let headerChoices = [
    "useful",
    "wonderful",
    "interesting",
    "amazing",
    "imaginative",
  ];
  let headerIndex = 0;
  let displayWord = "";
  setInterval(() => {
    if (headerIndex === headerChoices.length - 1) {
      headerIndex = 0;
    }
    loop(headerChoices[headerIndex], 1);
    headerIndex = headerIndex + 1;
  }, 4000);

  function loop(word: string, index: number) {
    setTimeout(() => {
      if (index === word.length + 1) {
        setTimeout(() => {}, 1000);
        return;
      }
      displayWord = word.slice(0, index);
      loop(word, (index += 1));
    }, 70);
  }
</script>

<section>
  <div class="header">
    <h3>Hello, I'm <span class="name"> Jared </span></h3>
    <h4>I'm a full-stack developer</h4>
    <h6>
      Let's create something <span class="text">{displayWord}</span><span
        class="cursor">|</span
      >
    </h6>
  </div>
</section>

<style lang="sass">
section
    display: flex
    justify-content: center
    align-items: center
    height: calc(85vh - var(--nav-height))
    background: radial-gradient(circle, rgba(37,32,84,1) 30%, rgba(205,98,240,1) 71%, rgba(112,98,240,1) 90%)
    animation: shift 5s ease infinite
    overflow: hidden
    @keyframes shift
        from 
            background-position: 100% 100%
        50%
           background-position: 25% 70%
        to 
            background-position: 100% 100%
    
        

h3, h4, h6 
    color: var(--dark20)
.text
    color: var(--primary)
.cursor
    color: var(--accent)
    animation: blink 0.7s infinite
    @keyframes blink 
        from
            opacity: 0%
        to
            opacity: 100%
.header
    padding: 0px 20px
.name
    color: var(--accent)
</style>
