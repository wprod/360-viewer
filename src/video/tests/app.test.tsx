import { render } from '@testing-library/react';
import React from 'react';
import { Viewer } from '../viewer';
import { buildPlaneGeometry } from '../utils';
import { Vector3 } from 'three';

it('should build a curved plane geometry', (): void => {
  const testPlane = buildPlaneGeometry(4, [
    new Vector3(0, 0, 0),
    new Vector3(1, 0, 0),
    new Vector3(2, 0, 0),
    new Vector3(3, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(1, 1, 0),
    new Vector3(2, 1, 0),
    new Vector3(3, 1, 0),
    new Vector3(0, 2, 0),
    new Vector3(1, 2, 0),
    new Vector3(2, 2, 0),
    new Vector3(3, 2, 0),
    new Vector3(0, 3, 0),
    new Vector3(1, 3, 0),
    new Vector3(2, 3, 0),
    new Vector3(3, 3, 0),
  ]);

  // Horizontal deformation :
  // Check if the first vector of the first row is higher than the 2nd one :
  expect(testPlane[0].z).toBeGreaterThan(testPlane[1].z);
  // Check if the last vector of the first row is higher than the previous one :
  expect(testPlane[3].z).toBeGreaterThan(testPlane[2].z);

  // Vertical deformation :
  // Check if the first vector of the first row is higher than the first one of the 2nd row :
  expect(testPlane[0].z).toBeGreaterThan(testPlane[4].z);
  // Check if the first vector of the last row is higher than the first one of the previous row :
  expect(testPlane[12].z).toBeGreaterThan(testPlane[8].z);
});
