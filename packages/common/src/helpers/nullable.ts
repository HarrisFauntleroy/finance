export type Nullable<T> = { [K in keyof T]: T[K] | undefined }

export type DeepNullable<T> = {
	[K in keyof T]: DeepNullable<T[K]> | undefined
}
