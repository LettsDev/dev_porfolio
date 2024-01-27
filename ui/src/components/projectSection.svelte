<script lang="ts">
  import ProjectCard from "./projectCard.svelte";
  import resourceManagerWide2 from "../images/resource_project/resource-manager-wide2.webp";
  import waldo from "../images/waldo/waldo.webp";
</script>

<section id="project" data-section>
  <h4>Projects</h4>
  <div class="card-container">
    <ProjectCard
      title="Resource Manager"
      text="A full-stack resource management and scheduling App that simplifies the process of keeping track of resources, their assigned locations and the services that they require."
      addressOne="https://resource-manager.fly.dev/login"
      addressTwo="https://github.com/LettsDev/service_portfolio"
      wideImage={{
        img: resourceManagerWide2,
        alt: "image of app calendar",
      }}
    />
    <ProjectCard
      title="Where's Waldo"
      text="A firebase picture-searching app that has a persistent scoreboard."
      addressOne="https://waldo-20f80.web.app/"
      addressTwo="https://github.com/LettsDev/waldo"
      wideImage={{
        img: waldo,
        alt: "image of waldo app",
      }}
    />
  </div>
</section>

<style lang="scss">
  section {
    background: var(--dark100);
    padding: 24px 16px 16px 16px;
    margin-top: -1px;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  h4 {
    text-align: center;
    padding-bottom: 24px;
    color: var(--secondary);
  }
</style>
