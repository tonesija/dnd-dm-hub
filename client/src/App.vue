<template>
  <div id="app">
    <b-navbar type="is-primary" shadow centered>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
            <b-navbar-item tag="div">
                <b-field>
                    <b-input icon="search" size="is-small" type="search"></b-input>
                    <p class="control">
                        <b-button size="is-small" class="button is-tertiary">Search</b-button>
                    </p>
                </b-field>
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item class="bold" tag="router-link" :to="{path: '/'}">
                Home (TODO)
            </b-navbar-item>
            <b-navbar-item class="bold" tag="router-link" :to="{path: '/monsters'}">
                Monsters
            </b-navbar-item>
            <b-navbar-item class="bold" tag="router-link" :to="{path: '/spells'}">
                Spells (TODO)
            </b-navbar-item>
            <b-navbar-item class="bold" tag="router-link" :to="{path: '/races'}">
                Races (TODO)
            </b-navbar-item>
            <b-navbar-item class="bold" tag="router-link" :to="{path: '/classes'}">
                Classes (TODO)
            </b-navbar-item>
            <b-navbar-dropdown class="bold" label="Tools">
                <b-navbar-item tag="router-link" :to="{path: '/combat-tracker'}">
                    Combat tracker
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{path: '/treasure-generator'}">
                    Treasure generator (TODO)
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-dropdown class="bold" label="Info">
                <b-navbar-item href="#">
                    About (TODO)
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact (TODO)
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                Nesto (TODO)
            </b-navbar-item>
        </template>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style lang="scss">
@import './sass/myvars.scss';

#app {
  font-family: $secondary-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: $tertiary;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.view {
  padding-left: 7%;
  padding-right: 7%;
}

.main-title {
    font-size: 28px;
    font-weight: 600;
}
.sub-title {
    font-size: 22px;
    font-weight: 600;
}
.text {
    color: rgb(51, 51, 51);
    font-size: 16px;
    font-weight: 400;
}
.title-footer {
    border-bottom: $primary 4px solid;
}
.separator {
    height: 5px;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    background-image: linear-gradient(to right, $primary , rgba(255, 255, 255, 0));
}

.float-right{
    margin-left: 0.5rem;
}
.margin-bottom {
    margin-bottom: 70px;
}

.bold {
    font-family: $primary-font;
    color: $secondary;
    font-weight: 600;
}




</style>
