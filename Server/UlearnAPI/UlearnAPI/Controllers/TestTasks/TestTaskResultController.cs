﻿using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using UlearnData.Models.Tasks.CodeTasks;
using UlearnData.Models.Tasks.TestTasks;
using UlearnServices.Models.Tasks.CodeTasks;
using UlearnServices.Models.Tasks.TestTasks;
using UlearnServices.Services.TestTasks;

namespace UlearnAPI.Controllers.TestTasks
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestTaskResultController : ControllerBase
    {
        private readonly TestTaskResultService _testTaskResultService;

        public TestTaskResultController(TestTaskResultService testTaskResultService)
        {
            _testTaskResultService = testTaskResultService;
        }

        [HttpPost("confirm")]
        [Authorize]
        public async Task<IActionResult> Confirm([FromBody] TestTaskResultDto model)
        {
            var userId = User.FindFirstValue("sub");
            await _testTaskResultService.Confirm(userId, model);
            return Ok(new { });
        }

        [HttpGet("{taskId}")]
        [Authorize]
        public async Task<TestTaskResult> GetByTaskId(int taskId)
        {
            var userId = User.FindFirstValue("sub");
            return await _testTaskResultService.GetByTaskId(userId, taskId);
        }
    }
}