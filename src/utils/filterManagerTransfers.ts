import {
  CustomTransferDelegate,
  PlayerDelegate,
  TransferDelegate,
} from 'src/types/api';

export const filterManagerTransfers = (
  elements?: PlayerDelegate[],
  transfers?: TransferDelegate[],
): CustomTransferDelegate[] => {
  if (!elements?.length || !transfers?.length) {
    return [];
  }

  return transfers.map(t => ({
    ...t,
    element_in_web_name: elements.find(el => el.id === t.element_in)?.web_name!,
    element_out_web_name: elements.find(el => el.id === t.element_out)
      ?.web_name!,
  }));
};
