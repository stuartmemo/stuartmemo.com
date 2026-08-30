var davidArray = [
    'alike', 'always', 'am', 'apologise', 'are', 'apologies', 'are', 
    'a', 'able', 'about', 'additions', 'alike', 'all', 'already', 'always',
    'and', 'answer', 'any', 'anyone', 'anything', 'apologies', 'apologise', 'appear', 'are',
    'arent', 'as', 'ask', 'asked', 'at', 'awake', 'audio', 'api', 'album',

    'be', 'because', 'been', 'before', 'being', 'belief', 'believe', 'belongs', 'better',
    'between', 'bit', 'block', 'bother', 'bothering', 'bots', 'bring', 'brother', 'but', 'bye',

    'can', 'cant', 'computer', 'communications', 'could', 'cannot',
    'came', 'can', 'cant', 'cannot', 'care', 'certain', 'chances', 'child',
    'children', 'cleanings', 'come', 'comes', 'coming', 'computer', 'computers',
    'concerned', 'connection', 'connections', 'continue', 'could', 'certainly',

    'deutsch', 'different', 'done', 'dream', 'dreamed', 'dont', 'did', 'do', 'does', 'dont',
    'dad', 'data', 'depends', 'depressed', 'description', 'desired', 'difference',
    'differences', 'different', 'discuss', 'discussing', 'discussion', 'disparity',
    'distinctions', 'do', 'does', 'dont', 'doubt', 'dreams', 'desire', 'dreamt',

    'espanol', 'everybody', 'everyone', 'exit', 'eliza',
    'equivalent', 'each', 'elaborate', 'elated','else', 'elses', 'enjoy', 'eyes',
    'entries', 'estimate', 'ever', 'everybody', 'everyone', 'example', 'explain',

    'finals', 'forget', 'francais', 'foreign', 'french', 'favourite',
    'fact', 'family', 'fantasies', 'fantasized', 'father', 'feel', 'feeling', 'feelings',
    'final', 'for', 'forget', 'forgetful', 'forgot', 'forward', 'fully', 'further',

    'german' , 'goodbye', 'generally', 'getting', 'glad', 'go', 'good', 'got', 'goto',

    'hello', 'how', 'has', 'have', 'hi', 'how', 'happy', 'had', 'hear', 'help', 'helped', 'here', 'how',

    'i', 'if', 'italiano', 'Ive', 'In', 'Is', 'It', 'Its', 'Italian', 'identical', 'im', 'initials',
    'idea', 'important', 'inincident', 'interest', 'interested', 'interesting',
    'is', 'it', 'its',

    'january', 'just',

    'know', 'keywords',

    'layed', 'lead', 'like', 'likely', 'long', 'looking', 'like', 'lets',

    'maybe', 'my', 'machines', 'mean', 'means', 'mental', 'mention', 'mentioned', 'might',
    'mind', 'mom', 'more', 'moreover', 'most', 'mother', 'much', 'multiple', 'my', 'me', 'myself',
    'made', 'makes', 'matter', 'may', 'meme', 'machine',

    'name', 'no', 'nobody', 'noone', 'none', 'negative', 'never', 'next', 'nice', 'normal', 'not', 'now',
    'names', 'necessary', 'need',

    'of', 'oh', 'often', 'old', 'old', 'one', 'only', 'or', 'original', 'other', 'our', 'out', 'over', 'own', 'on',

    'perhaps', 'please', 'possibly', 'post', 'posts', 'pre', 'pairs', 'particular', 'people', 'performed', 'perhaps',
    'person', 'persons', 'pleasant', 'please', 'positive', 'prefer', 'present', 'prestructured', 'problem', 'program',

    'quit', 'question', 'questions', 'quite', 'quits',

    'remember', 'really', 'real', 'reason', 'reasons', 'recall', 'recollect', 'replacement',
    'recall', 'remind', 'reminds', 'required', 'resemblence', 'recording',

    'sorry', 'should', 'Someone', 'Spanish', 'Suppose', 'Surely',
    'sad', 'said', 'say', 'saying', 'see', 'seem', 'seems', 'session', 'should', 'sick', 'similarity', 'sister', 'situation',
    'so', 'some', 'someone', 'something', 'sometimes', 'soon', 'sorry', 'speak', 'special',
    'specific', 'speculation', 'state', 'strongly', 'such', 'suddenly', 'suggest', 'suggests',
    'suppose', 'suppose', 'suppressing', 'sure', 'same',

    'Tell', 'That', 'Thats', 'talk', 'talked', 'talking', 'tell', 'than', 'that', 'the', 'there', 'they',
    'things', 'think', 'thinking', 'this', 'time', 'to', 'told', 'tone', 'treatment', 'tried', 'trouble', 'troubling',
    'transforms', 'thing', 'thoughts',

    'uncertain', 'understand', 'unhappy',

    'very',

    'was', 'what', 'when', 'where', 'who', 'why', 'We', 'Weizenbaums',
    'Were', 'What', 'When', 'Whether', 'Who', 'Why', 'Would', 'web',
    'want', 'wanting', 'was', 'wasnt', 'way', 'we', 'were', 'werent', 'what', 'whats', 'when', 'where',
    'whether', 'which', 'while', 'who', 'why', 'wife', 'will', 'wish', 'with', 'wont',
    'worried', 'worries', 'worry', 'would', 'wazza',

    'yes', 'you', 'your', 'youre', 'yourself'];


var davidObj = {};

for (var i = 0; i < davidArray.length; i++) {
    davidObj[davidArray[i].toLowerCase()] = 'audio/' + davidArray[i].toLowerCase() + '.wav';
}

var davidAudio = [davidObj];
