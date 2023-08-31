/**1 */
class Player {
    /**
     * Plays a warrior turn.
     *
     * @param {Warrior} warrior The warrior.
     */

    playTurn(warrior) {
      warrior.walk()

    }
  }

  /**2 */
  class Player {
    /**
     * Plays a warrior turn.
     *
     * @param {Warrior} warrior The warrior.
     */

    playTurn(warrior) {
      const walk = () => warrior.walk()
      const feel = () => warrior.feel()
      const attack = () => warrior.attack()

      const freeWay = () => {
        return feel().isEmpty() ? walk() : attack()
      }

      freeWay()

    }
  }

  /**3 */
  class Player {
    /**
     * Plays a warrior turn.
     *
     * @param {Warrior} warrior The warrior.
     */

    playTurn(warrior) {
      let _end_turn = false
      const _log = (t) => warrior.think(t)
      let health = warrior.health()
      const critic_health = 4
      const min_safe = 10
      let in_dangerous = false
      const feel = () => warrior.feel().isEmpty() ? false : true

      if (health < critic_health) {
        in_dangerous = true
      }

      const walk = (dir='forward') => {
        if (!feel() && !in_dangerous) {
          _log("camina palante")
          warrior.walk()
        } else if (feel() && in_dangerous) {
          _log("camina patras")
          warrior.walk('backward')
        }
      }


      const attack = (dir='forward') => {
        if (feel() && !in_dangerous) {
          _log("attaca")
          warrior.attack()
        }
      }

      const rest = () => {
        if (!feel() && in_dangerous) {
          warrior.rest()
          if (health > min_safe) {
            in_dangerous = false
          }
        }
      }




      const _play = () => {
        attack()

        walk()

        rest()
      }

      _play()

    }
  }


  /**4 */

  class Player {
    /**
     * Plays a warrior turn.
     *
     * @param {Warrior} warrior The warrior.
     */


    playTurn(warrior) {

      const _log = (t) => warrior.think(t)
      const feel = () => warrior.feel().isEmpty() ? false : true
      const critic_health = 10
      const min_safe_health = 15

      let health = warrior.health()

      const considerDanger = () => {
        if (health < critic_health) {
          this.in_dangerous = true
        }
      }

      const walk = (dir='forward') => {

        if (feel() && this.in_dangerous) {
          warrior.walk('backward')
        }

        if (!feel() && !this.in_dangerous) {
          warrior.walk()
          _log("info")
        }

      }

      const attack = (dir='forward') => {
        if (feel() && !this.in_dangerous) {
          warrior.attack()
        }
      }

      const rest = () => {
        if (!feel() && this.in_dangerous) {
          warrior.rest()
          if (health > min_safe_health) {
            this.in_dangerous = false
          }
        }
      }




      const _play = () => {

        considerDanger()

        attack()

        walk()

        rest()
      }

      _play()

    }
  }

  /**5 - 116*/
  class Player {
    /**
     * Plays a warrior turn.
     *
     * @param {Warrior} warrior The warrior.
     */


    playTurn(warrior) {

      const _log = (t) => warrior.think(t)
      const feel =  warrior.feel()
      const critic_health = 7
      const min_safe_health = 15

      const feel_empty = feel.isEmpty() ? true : false
      const feel_enemy = !feel_empty ? warrior.feel().getUnit().isEnemy() : false
      const feel_captive = !feel_empty ? warrior.feel().getUnit().isBound() : false



      let health = warrior.health()


      const rescue = () => {
        if (!feel_empty && feel_captive ) {
          warrior.rescue()
        }
      }

      const considerDanger = () => {
        if (health < critic_health) {
          this.in_dangerous = true
        }
      }

      const walk = (dir='forward') => {

        if (!feel_empty && this.in_dangerous) {
          warrior.walk('backward')
        }

        if (feel_empty && !this.in_dangerous) {
          warrior.walk()
        }

      }

      const attack = (dir='forward') => {
        if (!feel_empty && feel_enemy && !this.in_dangerous) {
          warrior.attack()
        }
      }

      const rest = () => {
        if (feel_empty && this.in_dangerous) {
          warrior.rest()
          if (health > min_safe_health) {
            this.in_dangerous = false
          }
        }
      }

      const _play = () => {

        considerDanger()

        rescue()

        attack()

        walk()

        rest()
      }

      _play()

    }
  }
