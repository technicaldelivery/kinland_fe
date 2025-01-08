export default (context, inject) => {
  const formatNames = names => {
    if (names.length === 1) return names[0];
    const firsts = names.slice(0, names.length - 1);
    const last = names[names.length - 1];
    return firsts.join(', ') + ' and ' + last;
  };
  inject('formatNames', formatNames);
}
