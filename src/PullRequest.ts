interface Reviewer {
    reviewerUrl: string
    vote: number
    hasDeclined: boolean
    isRequired: boolean
    isFlagged: boolean
    displayName: string
    url: string
    id: string
    uniqueName: string
    imageUrl: string
}

interface Commit {
    commitId: string
    url: string
}

type PullRequest = {
    repository: {
    id: string
    name: string,
    url: string,
    project: {
      id: string,
      name: string,
      state: string,
      visibility: string,
      lastUpdateTime: string,
    }
  },
  pullRequestId: number,
  codeReviewId: number,
  status: string,
  createdBy: {
    displayName: string,
    url: string,
    id: string,
    uniqueName: string,
    imageUrl: string,
    descriptor: string,
  },
  creationDate: Date,
  closedDate: Date,
  title: string,
  description: string,
  sourceRefName: string,
  targetRefName: string,
  mergeStatus: string,
  isDraft: boolean,
  mergeId: string,
  lastMergeSourceCommit: {
    commitId: string,
    url: string,
  },
  lastMergeTargetCommit: Commit,
  lastMergeCommit: Commit,
  reviewers: Reviewer[],
  url: string
  completionOptions: {
    mergeCommitMessage: string,
    mergeStrategy: string,
    triggeredByAutoComplete: boolean,
    autoCompleteIgnoreConfigIds: []
  },
  supportsIterations: boolean,
  completionQueueTime: Date
}