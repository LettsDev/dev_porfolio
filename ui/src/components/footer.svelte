<script lang="ts">
  import githubMarkIcon from "../images/icons/github-mark-white.svg";
</script>

<footer>
  <div class="all-rights">
    <span>Jared Letts</span> All rights reserved {new Date().getFullYear()}
  </div>
  <div class="icon-container">
    <a href="https://github.com/LettsDev/dev_porfolio">
      <img src={githubMarkIcon.src} alt="github logo" />
    </a>
  </div>
</footer>

<style lang="scss">
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 16px;
    padding: 1rem auto 1rem auto;
    background-color: var(--dark100);
    color: var(--dark10);
  }
  .all-rights {
    padding-right: 2rem;
    span {
      font-weight: bold;
      padding-right: 16px;
      font-size: 1.1rem;
    }
  }
  img {
    height: 1.5rem;
    width: 1.5rem;
  }
</style>
