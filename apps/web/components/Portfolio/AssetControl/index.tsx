import type { AssetFormInputs } from './AssetForm';
import { AssetForm } from './AssetForm';
import { DeleteAsset } from './DeleteAsset';

type AssetControlProps = {
  variant?: 'delete';
  defaultValues?: AssetFormInputs;
};

export const AssetControl = ({ defaultValues, variant }: AssetControlProps) => {
  return variant === 'delete' ? (
    <DeleteAsset id={defaultValues?.id} />
  ) : (
    <AssetForm defaultValues={defaultValues} />
  );
};
