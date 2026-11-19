(function () {
  "use strict";

  const INK = "#5C4033";

  class CapsuleDomePhysics {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.balls = [];
      this.width = 320;
      this.height = 236;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.rafId = null;
      this.resize();
      window.addEventListener("resize", () => this.resize());
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = Math.max(260, Math.round(rect.width || 320));
      this.height = Math.max(200, Math.round(rect.height || 236));
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    setCapsules(capsuleConfigs) {
      const cols = 3;
      const radius = Math.min(31, Math.max(25, Math.floor(this.width / 10.6)));
      this.balls = capsuleConfigs.map((cfg, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const startX = this.width * 0.24 + col * (this.width * 0.26) + (Math.random() * 14 - 7);
        const startY = this.height - radius - 14 - row * (radius * 1.95) - Math.random() * 10;
        return {
          id: cfg.id,
          topColor: cfg.topColor,
          bottomColor: cfg.bottomColor || "#FFFDF9",
          mark: cfg.mark || "♡",
          x: startX,
          y: Math.max(radius + 10, startY),
          vx: (Math.random() - 0.5) * 1.2,
          vy: 0,
          r: radius,
          angle: (Math.random() - 0.5) * 0.8,
          vAngle: (Math.random() - 0.5) * 0.03
        };
      });
    }

    removeBall(id) {
      const idx = this.balls.findIndex((b) => b.id === id);
      if (idx !== -1) {
        this.balls.splice(idx, 1);
      }
    }

    stir(power) {
      const strength = power || 8;
      this.balls.forEach((b) => {
        b.vx += (Math.random() - 0.5) * strength * 1.8;
        b.vy -= Math.random() * strength * 1.15 + 2.5;
        b.vAngle += (Math.random() - 0.5) * 0.22;
      });
    }

    nudge() {
      this.balls.forEach((b) => {
        b.vx += (Math.random() - 0.5) * 4.2;
        b.vy -= Math.random() * 4.8 + 1.4;
        b.vAngle += (Math.random() - 0.5) * 0.1;
      });
    }

    step() {
      const gravity = 0.34;
      const damping = 0.985;
      const bounce = 0.45;
      const w = this.width;
      const h = this.height;
      const pad = 10;

      for (let i = 0; i < this.balls.length; i++) {
        const b = this.balls[i];
        b.vy += gravity;
        b.vx *= damping;
        b.vy *= damping;
        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.vAngle;
        b.vAngle *= 0.96;

        // 边界碰撞
        if (b.x - b.r < pad) {
          b.x = pad + b.r;
          b.vx = Math.abs(b.vx) * bounce;
          b.vAngle += 0.02;
        } else if (b.x + b.r > w - pad) {
          b.x = w - pad - b.r;
          b.vx = -Math.abs(b.vx) * bounce;
          b.vAngle -= 0.02;
        }

        if (b.y + b.r > h - pad) {
          b.y = h - pad - b.r;
          if (Math.abs(b.vy) < 0.7) {
            b.vy = 0;
          } else {
            b.vy = -Math.abs(b.vy) * bounce;
          }
          b.vx *= 0.92;
        } else if (b.y - b.r < pad) {
          b.y = pad + b.r;
          b.vy = Math.abs(b.vy) * bounce;
        }
      }

      // 球与球碰撞
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < this.balls.length; i++) {
          for (let j = i + 1; j < this.balls.length; j++) {
            const a = this.balls[i];
            const b = this.balls[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            const minDist = a.r + b.r;
            if (dist < minDist) {
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;

              const rvx = b.vx - a.vx;
              const rvy = b.vy - a.vy;
              const velAlongNormal = rvx * nx + rvy * ny;
              if (velAlongNormal < 0) {
                const impulse = -(1 + 0.35) * velAlongNormal * 0.5;
                a.vx -= impulse * nx;
                a.vy -= impulse * ny;
                b.vx += impulse * nx;
                b.vy += impulse * ny;
              }
            }
          }
        }
      }
    }

    drawBall(b) {
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);

      // 底部柔和阴影
      ctx.beginPath();
      ctx.arc(0, 2, b.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(92, 64, 51, 0.08)";
      ctx.fill();

      // 裁剪成圆形绘制上下双色胶囊
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.clip();

      // 上半彩色
      ctx.fillStyle = b.topColor;
      ctx.fillRect(-b.r, -b.r, b.r * 2, b.r);

      // 下半奶油白
      ctx.fillStyle = b.bottomColor;
      ctx.fillRect(-b.r, 0, b.r * 2, b.r);

      // 中间可可棕腰线
      ctx.fillStyle = INK;
      ctx.fillRect(-b.r, -1.6, b.r * 2, 3.2);

      // 中间小圆扣
      ctx.beginPath();
      ctx.arc(0, 0, 5.2, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFDF9";
      ctx.fill();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = INK;
      ctx.stroke();

      // 上半高光
      ctx.beginPath();
      ctx.ellipse(-b.r * 0.34, -b.r * 0.44, b.r * 0.24, b.r * 0.13, -0.45, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
      ctx.fill();

      // 底部小符号
      ctx.fillStyle = "rgba(92, 64, 51, 0.35)";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(b.mark, 0, b.r * 0.52);

      ctx.restore();

      // 外圈手绘可可棕描边
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.lineWidth = 2.8;
      ctx.strokeStyle = INK;
      ctx.stroke();

      ctx.restore();
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      // 玻璃罩内底部柔和托盘弧线
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(this.width / 2, this.height - 6, this.width * 0.42, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 182, 201, 0.28)";
      ctx.fill();
      ctx.restore();

      for (let i = 0; i < this.balls.length; i++) {
        this.drawBall(this.balls[i]);
      }
    }

    start() {
      if (this.rafId) return;
      const loop = () => {
        this.step();
        this.render();
        this.rafId = requestAnimationFrame(loop);
      };
      this.rafId = requestAnimationFrame(loop);
    }
  }

  window.CapsuleDomePhysics = CapsuleDomePhysics;
})();
