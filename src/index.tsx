import ReactDOM from 'react-dom';
import React from 'react';
import { Viewer } from './components/viewer/viewer';
import { View, ViewContentTypeEnum } from './components/viewer/models/models';
import Helmet from 'react-helmet';
import './styles/global.scss';

const views: View<ViewContentTypeEnum>[] = [
  {
    name: 'Refuge du gouter',
    description: 'Coucher de soleil',
    pointOfInterest: [
      {
        position: { x: 1, y: 1 },
        name: 'Refuge du gouter',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: { x: -3, y: 5 },
        name: 'Chamonix',
        link: 'https://www.chamonix.com/',
      },
      {
        position: { x: -1, y: -2 },
        name: 'Passy',
        link: 'https://www.chamonix.com/',
      },
    ],
    content: {
      type: ViewContentTypeEnum.Video,
      src: './assets/video-1.mp4',
    },
  },
  {
    name: 'Dent de Crolles',
    description: 'Levé de soleil',
    pointOfInterest: [
      {
        position: { x: 2.5, y: -0.8 },
        name: 'Passage du chamois',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: { x: -10, y: -8 },
        name: 'Grenoble',
        link: 'https://www.chamonix.com/',
      },
      {
        position: { x: -7, y: -6.7 },
        name: 'Crolles',
        link: 'https://www.chamonix.com/',
      },
    ],
    content: {
      type: ViewContentTypeEnum.Video,
      src: './assets/video-3.mp4',
    },
  },
  {
    name: 'Refuge du soleil',
    description: 'Photo du levé de soleil',
    pointOfInterest: [
      {
        position: { x: 1.1, y: 1 },
        name: 'Refuge du Soleil',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: { x: -3, y: 5 },
        name: 'Grenoble',
        link: 'https://www.chamonix.com/',
      },
      {
        position: { x: -1, y: -20 },
        name: 'Crolles',
        link: 'https://www.chamonix.com/',
      },
    ],
    content: {
      type: ViewContentTypeEnum.Image,
      src: './assets/img-1.jpg',
    },
  },
];

ReactDOM.render(
  <>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Helmet>

    <header className="wrapper">
      <h1 className="header__title">220° viewer</h1>
      <p>
        This project uses{' '}
        <a href="https://github.com/react-spring/react-three-fiber">
          React-Fiber
        </a>
        , A react renderer for threejs (web and react-native).
        <br /> Find the source code{' '}
        <a href="https://github.com/wprod/360-viewer">here</a>.
      </p>
    </header>
    <Viewer views={views} />
    <footer className="wrapper">
      <p>
        Your code editor should be configured to fix ESLint and stylelint errors
        and format files with Prettier on save. <br />
        Make sure to install the recommended extensions in VSCode and the
        recommended plugins in IntelliJ.
      </p>

      <b>Cool stuff</b>
      <ul>
        <li>
          <a href="https://codepen.io/wprod">Codepen</a>
        </li>
        <li>
          <a href="https://medium.com/@witters.amand">Medium</a>
        </li>
      </ul>
    </footer>
  </>,
  document.getElementById('root')
);
