document.addEventListener('DOMContentLoaded', function () {
    const pollBoxes = document.querySelectorAll('.pollBox')
    const boxVote = document.querySelector('.bgrVote')

    pollBoxes.forEach((pollBox) => {
        pollBox.addEventListener('click', () => {
            // Lấy target từ data attribute

            const target = pollBox.getAttribute('data-target')
            // Hiển thị boxVote với target tương ứng
            boxVote.classList.add('active')

            // Cập nhật nội dung của boxVote tùy thuộc vào target
            // Ví dụ: thay đổi tiêu đề hoặc nội dung tùy thuộc vào target
            // Bạn có thể thêm logic để thay đổi nội dung của boxVote
            // dựa trên target
            const titleVote = document.querySelector('.titleVote')
            titleVote.textContent = `TITLE VOTE ${target.toUpperCase()}`
        })
    })

    // Tùy chọn: Thêm sự kiện để ẩn bgrVote khi nhấp ra ngoài
    boxVote.addEventListener('click', function (event) {
        if (event.target === boxVote) {
            boxVote.classList.remove('active')
        }
    })

    let selectedRadio = null // Lưu trữ radio đã chọn trước đó

    const voteOptions = document.querySelectorAll('.voteOption')

    voteOptions.forEach((voteOption) => {
        voteOption.addEventListener('click', function () {
            const radio = this.querySelector('input[type="radio"]')
            const numberVote = this.querySelector('.numberVote')

            if (!radio.checked) {
                // Nếu radio chưa được chọn
                // Nếu có radio đã chọn trước đó
                if (selectedRadio) {
                    const prevVoteOption = selectedRadio.closest('.voteOption')
                    const prevNumberVote =
                        prevVoteOption.querySelector('.numberVote')
                    // Giảm số bình chọn của tùy chọn trước đó
                    prevNumberVote.textContent =
                        parseInt(prevNumberVote.textContent, 10) - 1
                }

                // Chọn radio button hiện tại
                radio.checked = true

                // Tăng số bình chọn của tùy chọn hiện tại
                numberVote.textContent =
                    parseInt(numberVote.textContent, 10) + 1

                // Cập nhật radio đã chọn
                selectedRadio = radio
            }
        })
    })
})

