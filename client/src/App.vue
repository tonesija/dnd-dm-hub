<template>
  <div id="app">
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{path: '/'}">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{path: '/monsters'}">
                Monsters
            </b-navbar-item>
            <b-navbar-dropdown label="Tools">
                <b-navbar-item tag="router-link" :to="{path: '/combat-tracker'}">
                    Combat tracker
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{path: '/treasure-generator'}">
                    Treasure generator
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.view {
  padding-left: 7%;
  padding-right: 7%;
}

.sub-title {
    font-size: 20px;
    font-weight: 600;
}
.title-footer {
    border-bottom: red 4px solid;
}
.separator {
    height: 5px;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    background-image: linear-gradient(to right, red , rgba(255, 255, 255, 0));
}
</style>
