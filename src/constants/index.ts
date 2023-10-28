export {colors} from './colors';
export {sizes} from './sizes';
export {fonts} from './fonts';

const MIN_GKPS_LINEUP = 1;
const MIN_DEFS_LINEUP = 3;
const MIN_MIDS_LINEUP = 2;
const MIN_FWDS_LINEUP = 1;

// as per the enumeration of element_type
export const MIN_ELEMENT_TYPES_LINEUP: {[key: number]: number} = {
  1: MIN_GKPS_LINEUP,
  2: MIN_DEFS_LINEUP,
  3: MIN_MIDS_LINEUP,
  4: MIN_FWDS_LINEUP,
};
