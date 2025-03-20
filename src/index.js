import styles from "./style.css";
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

const vertexShaderSource = `
    attribute vec2 points;
    attribute vec2 texture_coordinate;

    varying highp vec2 v_texture_coordinate;

    void main(void) {
        gl_Position = vec4(points, 0.0, 1.0);
        v_texture_coordinate = texture_coordinate;
    }
`;

const fragmentShaderSource = `
    precision highp float;
    varying highp vec2 v_texture_coordinate;
    uniform sampler2D sampler;

    void main() {
        gl_FragColor = texture2D(sampler, v_texture_coordinate);
    }
`;

const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragmentShader, fragmentShaderSource);

gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program));
}
