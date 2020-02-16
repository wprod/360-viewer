import ReactDOM from 'react-dom';
import React from 'react';
import { Viewer } from './viewer/viewer';
import { View, ViewContentTypeEnum } from './viewer/models/models';
import Helmet from 'react-helmet';
import './styles/global.scss';

const views: View<ViewContentTypeEnum>[] = [
  {
    name: 'Refuge du gouter',
    description: 'Coucher de soleil',
    pointOfInterest: [
      {
        position: { x: 110, y: 10, z: 200 },
        name: 'Refuge du gouter',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: { x: -300, y: 50, z: 200 },
        name: 'Chamonix',
        link: 'https://www.chamonix.com/',
      },
      {
        position: { x: -100, y: -20, z: 200 },
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
    name: 'Refuge du soleil',
    description: 'Levé de soleil',
    pointOfInterest: [
      {
        position: { x: 0, y: 0, z: 500 },
        name: 'Refuge du Soleil',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: { x: -350, y: -160, z: 500 },
        name: 'Grenoble',
        link: 'https://www.chamonix.com/',
      },
      {
        position: { x: -180, y: -190, z: 500 },
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
        position: { x: 110, y: 10, z: 200 },
        name: 'Refuge du Soleil',
        link: 'https://refugedugouter.ffcam.fr/FR_home.html',
      },
      {
        position: { x: -300, y: 50, z: 200 },
        name: 'Grenoble',
        link: 'https://www.chamonix.com/',
      },
      {
        position: { x: -100, y: -20, z: 200 },
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

// Arbitrary create a list of "poi"

ReactDOM.render(
  <>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Helmet>
    <Viewer views={views} />
  </>,
  document.getElementById('root')
);
