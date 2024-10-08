const getTime = (seconds) => {
    const days = parseInt(seconds / 86400);
    let remainingSeconds = seconds % 86400;
    const hours = parseInt(remainingSeconds / 3600);
    remainingSeconds = seconds % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = parseInt(seconds % 60);
    return `${days} days ${hours} hours ${minutes} minutes ${remainingSeconds} seconds ago.`;
}

console.log(getTime(8000000));