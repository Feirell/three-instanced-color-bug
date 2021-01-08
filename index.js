import {
    AmbientLight,
    Color,
    InstancedMesh,
    Matrix4,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    SphereBufferGeometry,
    WebGLRenderer
} from "three";

function initialize() {
    const scene = new Scene();

    const body = document.body;
    const {clientHeight, clientWidth} = body;

    const camera = new PerspectiveCamera(35, clientWidth / clientHeight, 1, 5000);
    camera.position.set(0, 0, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(clientWidth, clientHeight);

    const ambient = new AmbientLight(0xffffff, 1);
    scene.add(ambient);

    body.appendChild(renderer.domElement);

    // creating first instanced mesh

    const sphereGeoA = new SphereBufferGeometry(8, 20, 20);
    const sphereMatA = new MeshStandardMaterial();

    const sphereMeshA = new InstancedMesh(sphereGeoA, sphereMatA, 1);
    sphereMeshA.name = "left-sphere";

    sphereMeshA.setMatrixAt(0, new Matrix4().makeTranslation(-10, 0, 0))
    sphereMeshA.setColorAt(0, new Color(0x00ff00));

    // creating second by cloning

    const sphereMeshB = sphereMeshA.clone(false);

    scene.add(sphereMeshA, sphereMeshB);

    renderer.render(scene, camera);
}

addEventListener("DOMContentLoaded", initialize);