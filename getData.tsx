import data from './data.json';
import {IList} from './App';

const getData = () =>
  new Promise<IList[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });

export default getData;
