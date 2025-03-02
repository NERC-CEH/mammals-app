// import React from 'react';
import { RouteWithModels, AttrPage } from '@flumens';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import NumberAttr from './common/Components/NumberAttr';
import Species from './Species';
// import CONFIG from 'common/config';
import ModelLocation from './Location';
import StartNewSurvey from './StartNewRecord';
import survey from './config';
import Home from './Home';

const baseURL = `/record/${survey.name}`;

const HomeWrap = (props: any) => <Home appModel={appModel} {...props} />;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId`, HomeWrap],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/:occId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/:occId/number`, NumberAttr],
  [`${baseURL}/:smpId/location`, ModelLocation],
  [`${baseURL}/:smpId/species`, Species],
];

export default RouteWithModels.fromArray(savedSamples, routes);
