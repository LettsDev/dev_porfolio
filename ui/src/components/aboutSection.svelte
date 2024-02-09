<script lang="ts">
  import portrait from "../images/portrait/pic2-resize.webp";
</script>

<section id="about" data-section>
  <h4>About Me</h4>

  <div class="content">
    <p>
      I’m a self-taught web developer who resides in British Columbia, Canada.
      My enthusiasm lies in the realms of automation and digital organization.
    </p>
    <div class="portrait-container">
      <img src={portrait.src} alt="portrait of Jared" />
    </div>
  </div>
</section>

<style lang="scss">
  section {
    background: var(--dark10);
    padding: 24px 16px 24px 16px;
    margin-top: -1px;
    h4 {
      text-align: center;
      padding-bottom: 24px;
      color: var(--primary);
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      max-width: clamp(4rem, 100%, 24rem);
    }
    img {
      border-radius: 16px;
      border: 2px solid black;
      width: clamp(300px, 100%, 600px);
    }
    .portrait-container {
      width: clamp(300px, 100%, 600px);
      align-self: center;
    }
  }
  @media screen and (min-width: 800px) {
    .content {
      flex-direction: row;
      justify-content: center;
      align-items: baseline;
      gap: 1rem;
      p {
        align-self: center;
      }
    }
  }
</style>
