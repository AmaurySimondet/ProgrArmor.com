import API from './API';
import { sortDateCroissant } from './utils';

async function getUser(id) {
  const { data } = await API.getUser({ id: id });
  if (data.success === false) {
    console.log(data.message);
  } else {
    if (data.profile.modeSombre && data.profile.modeSombre === true) {
      // 👇 add class to body element
      document.body.classList.add('darkMode');
    }
    return data.profile;
  }
}

async function getUserById(id) {
  const { data } = await API.getUser({ id: id });
  if (data.success === false) {
    return null, null;
  } else {
    return {
      profile: data.profile,
      lastSeance: data.seances.sort(sortDateCroissant).slice(-1)[0],
    };
  }
}

async function getProgrammesByUser(id) {
  const { data } = await API.getProgrammesByUser({ userId: id });
  if (data.success === false) {
    return null;
  } else {
    return data.programmes;
  }
}

export { getUser, getUserById, getProgrammesByUser };
