<template>
  <div class="home">
    <header>
      <h1>Welcome to Finanzas Personales</h1>
      <p>Manage your personal finances with ease.</p>
    </header>
    <section>
      <h2>Features</h2>
      <ul>
        <li>Track your income and expenses</li>
        <li>Set financial goals</li>
        <li>Generate financial reports</li>
      </ul>
    </section>
    <section>
      <h2>Get Started</h2>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  margin-top: 100px;
}

header {
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  color: #666;
}

section {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 1.1em;
  margin: 5px 0;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>