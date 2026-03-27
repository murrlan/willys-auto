import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WillysAutoPrototype from './WillysAutoPrototype.jsx';
import WillysAutoVideos from './WillysAutoVideos.jsx';
import WillysAutoStaff from './WillysAutoStaff.jsx';

const base = import.meta.env.BASE_URL;
const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
const path = window.location.pathname;
const videosPath = `${normalizedBase}/videos`;
const staffPath = `${normalizedBase}/staff`;
const isVideosRoute = path === videosPath || path === `${videosPath}/`;
const isStaffRoute = path === staffPath || path === `${staffPath}/`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isVideosRoute ? <WillysAutoVideos /> : isStaffRoute ? <WillysAutoStaff /> : <WillysAutoPrototype />}
  </StrictMode>,
);
