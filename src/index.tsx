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
        position: {
          x: -5.40924871190546,
          y: -0.7067147818302303,
          z: -8.301842331759326,
        },
        name: 'Refuge du gouter',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: {
          x: -1.290799454352555,
          y: -1.2671824835167418,
          z: -9.826303753401723,
        },
        name: 'Un cailloux',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },

      {
        position: {
          x: 8.499956913340242,
          y: -1.309946114376514,
          z: -4.655366804991561,
        },
        name: 'Super pancarte',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },

      {
        position: {
          x: 9.85058092526743,
          y: -1.0060418144916221,
          z: -0.5909866771013714,
        },
        name: 'Petite cabane',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },

      {
        position: {
          x: 4.828179954442493,
          y: -0.39890573736965435,
          z: -8.652855411969764,
        },
        name: 'En bas',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
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
    pointOfInterest: [],
    content: {
      type: ViewContentTypeEnum.Video,
      src: './assets/video-3.mp4',
    },
  },
  {
    name: 'Refuge du soleil',
    description: 'Photo du levé de soleil',
    pointOfInterest: [],
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
