import { describe, it, expect } from 'vitest';
import { githubToColabUrl } from './parse';

describe('githubToColabUrl', () => {
  it('should convert standard GitHub notebook URLs', () => {
    const githubUrl = 'https://github.com/googlecolab/colabtools/blob/main/notebooks/Gemma_Distributed_Fine_tuning_on_TPU.ipynb';
    const expected = 'https://colab.research.google.com/github/googlecolab/colabtools/blob/main/notebooks/Gemma_Distributed_Fine_tuning_on_TPU.ipynb';
    expect(githubToColabUrl(githubUrl)).toBe(expected);
  });

  it('should convert GitHub Gist URLs', () => {
    const gistUrl = 'https://gist.github.com/peap/f9e32370dd789d4fb2ca470fe8de3931';
    const expected = 'https://colab.research.google.com/gist/peap/f9e32370dd789d4fb2ca470fe8de3931';
    expect(githubToColabUrl(gistUrl)).toBe(expected);
  });

  it('should handle Gists with specific files', () => {
      const gistUrl = 'https://gist.github.com/peap/f9e32370dd789d4fb2ca470fe8de3931#file-test-ipynb';
      const expected = 'https://colab.research.google.com/gist/peap/f9e32370dd789d4fb2ca470fe8de3931#file-test-ipynb';
      expect(githubToColabUrl(gistUrl)).toBe(expected);
  });

  it('should return null for non-notebook URLs', () => {
    expect(githubToColabUrl('https://github.com/googlecolab/colabtools')).toBeNull();
    expect(githubToColabUrl('https://google.com')).toBeNull();
  });

  it('should handle URLs with query parameters', () => {
      const githubUrl = 'https://github.com/user/repo/blob/main/nb.ipynb?param=1';
      const expected = 'https://colab.research.google.com/github/user/repo/blob/main/nb.ipynb';
      // Note: The current regex GITHUB_REPO_RE = /^https?:\/\/github\.com\/(.+)\/(.*\.ipynb)(\?.+)?$/;
      // captures the query param in group 3 but doesn't include it in the output.
      // repoMatch[1] = user/repo/blob/main
      // repoMatch[2] = nb.ipynb
      expect(githubToColabUrl(githubUrl)).toBe('https://colab.research.google.com/github/user/repo/blob/main/nb.ipynb');
  });
});
