export default function defaultValue(result: unknown | undefined, value: unknown): unknown {
  return result === undefined ? value : result;
}
