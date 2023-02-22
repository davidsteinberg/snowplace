import Area from "./Area";

class House_1 extends Area {
  create(data = {}) {
    super.create(data);

    const { Character, Snowsuit } = this.data.values.objects;
    const { itemFrames, emotionFrames } = this.registry.values;

    Character.setVisible(false).disableBody();
    Character.data.values.machine.currentState = {};
    Character.play("Character.idle.up");

    Snowsuit.disableBody();
    Snowsuit.data.values.controls = {};
    Snowsuit.data.values.machine.currentState = {};
    Snowsuit.play("Snowsuit.idle.left");

    this.fadeInMusic("house");

    let fireSprite = null;
    const actions = [
      [
        500,
        () => {
          Character.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.exclamation.red,
            delay: 1000,
          });
        },
      ],

      [
        700,
        () => {
          Snowsuit.play("Snowsuit.idle.down");
        },
      ],

      [
        1300,
        () => {
          Character.setY(Character.y - 26).setVisible(true);
        },
      ],

      [
        200,
        () => {
          Character.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.angry,
            delay: 600,
            leaveBubble: true,
          });
        },
      ],

      [
        1300,
        () => {
          Character.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.question,
            delay: 1200,
          });
        },
      ],

      [
        1200,
        () => {
          Snowsuit.bubble({
            type: "speech",
            key: "tiles",
            frame: itemFrames.key,
          });
        },
      ],

      [
        400,
        () => {
          Snowsuit.play("Snowsuit.walk.down");

          this.tweens.add({
            targets: Snowsuit,
            y: "+=40",
            duration: 1700,
            onComplete: () => {
              Snowsuit.play("Snowsuit.idle.left");
            },
          });
        },
      ],

      [
        800,
        () => {
          Character.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.dots,
          });

          Character.play("Character.walk.left");

          this.tweens.add({
            targets: Character,
            x: "-=28",
            y: "-=41",
            duration: 950,
            onComplete: () => {
              Character.play("Character.idle.left");
            },
          });
        },
      ],

      [
        1600,
        () => {
          Snowsuit.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.dizzy,
            delay: 1700,
          });
        },
      ],
    ];

    const { axe } = this.registry.values.items;
    let bombDelay = 2700;

    if (axe) {
      bombDelay = 2000;

      actions.push(
        ...[
          [
            2700,
            () => {
              Snowsuit.bubble({
                type: "speech",
                key: "tiles",
                frame: itemFrames.axe,
                delay: 1000,
                leaveBubble: true,
              });
            },
          ],

          [
            1500,
            () => {
              Snowsuit.bubble({
                type: "speech",
                key: "tiles",
                frame: itemFrames.door.boarded,
                delay: 850,
              });
            },
          ],

          [
            400,
            () => {
              const item = Snowsuit.data.values.bubbleItems.speech;
              const sprite = this.add.sprite(item.x, item.y, "Slash");
              sprite
                .setDepth(this.data.values.maxDepth + 2)
                .on("animationcomplete", () => {
                  item.setFrame(itemFrames.door.open);
                  sprite.destroy();
                })
                .play("Slash", true);
            },
          ],

          [
            900,
            () => {
              Character.play("Character.idle.right");

              Character.bubble({
                type: "speech",
                key: "emotions",
                frame: emotionFrames.question,
                delay: 1500,
              });
            },
          ],
        ]
      );
    }

    actions.push(
      ...[
        [
          bombDelay,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "tiles",
              frame: itemFrames.bomb,
              delay: 1000,
              leaveBubble: true,
            });
          },
        ],

        [
          1500,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "tiles",
              frame: itemFrames.door.caved,
              delay: 1200,
            });
          },
        ],

        [
          400,
          () => {
            const item = Snowsuit.data.values.bubbleItems.speech;
            const sprite = this.add.sprite(item.x, item.y, "Explosion");
            sprite
              .setDepth(this.data.values.maxDepth + 2)
              .on("animationcomplete", () => {
                item.setFrame(itemFrames.door.open);
                sprite.destroy();
              })
              .play("Explosion", true);
          },
        ],

        [
          900,
          () => {
            if (!axe) {
              Character.play("Character.idle.right");
            }

            Character.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.surprised,
              delay: 1500,
            });
          },
        ],

        [
          2000,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "Mole",
              frame: 2,
              delay: 1200,
              leaveBubble: true,
            });
          },
        ],

        [
          1600,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.money,
              delay: 1200,
            });
          },
        ],

        [
          1000,
          () => {
            Character.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.exclamation.double,
              delay: 1500,
            });
          },
        ],

        [
          1600,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.stressed,
              delay: 1600,
            });
          },
        ],

        [
          1000,
          () => {
            Character.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.question,
              delay: 1200,
            });
          },
        ],

        [
          1700,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.idea,
              delay: 1200,
              leaveBubble: true,
            });
          },
        ],

        [
          1600,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "tiles",
              frame: itemFrames.crystal,
              delay: 1200,
              leaveBubble: true,
            });
          },
        ],

        [
          1600,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "tiles",
              frame: itemFrames.key,
              delay: 1200,
            });
          },
        ],

        [
          1300,
          () => {
            Character.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.heart,
              delay: 1500,
            });
          },
        ],

        [
          2300,
          () => {
            Snowsuit.play("Snowsuit.idle.up");
          },
        ],

        [
          400,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.dots,
              delay: 1500,
            });
          },
        ],

        [
          2300,
          () => {
            Snowsuit.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.empty,
              delay: 2300,
            });
          },
        ],

        [
          200,
          () => {
            const item = Snowsuit.data.values.bubbleItems.speech;
            fireSprite = this.add.sprite(item.x, item.y, "Fire");
            fireSprite
              .setDepth(this.data.values.maxDepth + 2)
              .play("fire", true);
          },
        ],

        [
          1800,
          () => {
            Character.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.happy,
              delay: 1500,
            });
          },
        ],

        [
          500,
          () => {
            fireSprite.destroy();
          },
        ],

        [
          2000,
          () => {
            Snowsuit.play("Snowsuit.walk.up");

            this.tweens.add({
              targets: Snowsuit,
              x: "+=8",
              y: "-=36",
              duration: 1600,
              onComplete: () => {
                Snowsuit.setVisible(false);
              },
            });

            this.cameras.main
              .on("camerafadeoutcomplete", () => {
                this.scene.start("End");
              })
              .fadeOut(1700);
          },
        ],

        [
          300,
          () => {
            Character.play("Character.walk.right");

            this.tweens.add({
              targets: Character,
              x: "+=46",
              y: "-=40",
              duration: 1800,
              onComplete: () => {
                Character.setVisible(false);
              },
            });
          },
        ],
      ]
    );

    let totalDelay = 0;

    for (const [delay, func] of actions) {
      totalDelay += delay;

      this.time.delayedCall(totalDelay, func);
    }
  }
}

export default House_1;
