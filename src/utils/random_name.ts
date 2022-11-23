import stat_file from '../assets/collocation_stats.txt';

interface Stats {
  stat_total: number,
  stats: {
    [name: string]: number,
  }
};

const import_stat = async () => {
  const lines = await fetch(stat_file)
    .then((response) => response.text())
    .then(data => data.split('\n'));

  let stat_total = 0;

  let stats: { [name: string]: number } = {};

  for (let line of lines) {
    let [key, value] = line.split(',');
    let weight = parseInt(value);
    stat_total += weight;
    stats[key] = weight;
  }

  return {
    stat_total,
    stats
  }
}

const weighted_random = ({ stat_total, stats }: Stats) => {
  let randInt = Math.floor(Math.random() * stat_total) + 1;

  const entries = Object.entries(stats);
  for (let [key, value] of entries) {
    randInt -= value;
    if (randInt <= 0) {
      return key;
    }
  }

  // Just in case
  return Object.keys(stats)[entries.length - 1];
}

const gen_subdict = (stat_dict: { [name: string]: number }, letter: string): Stats => {
  let subdict: { [name: string]: number } = {}
  let stat_total = 0

  for (const [key, value] of Object.entries(stat_dict)) {
    if (key[0] === letter) {
      subdict[key] = value;
      stat_total += value;
    }
  }

  return {
    stat_total,
    stats: subdict,
  }
}

export const random_name = async (min=2, max=100) => {
  const stats = await import_stat();

  const length = Math.floor(Math.random() * max) + min;

  let word = weighted_random(stats).trim();
  while (word.length < length) {
    word = word.trim();
    const last_letter = word[word.length - 1];
    const next_letter = weighted_random(gen_subdict(stats.stats, last_letter))[1];
    word += next_letter;
  }
  
  return word.trim();
}